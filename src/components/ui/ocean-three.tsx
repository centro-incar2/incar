"use client";

import { useEffect, useRef } from "react";

/**
 * "Cyber Ocean" — océano de partículas en WebGL (Three.js + shaders propios).
 *
 * Port del prototipo `ocean-threejs.html` a componente de React, adaptado para
 * usarse como fondo de una sección (no a pantalla completa):
 *
 * - Three.js y el postprocesado se cargan de forma DIFERIDA (import dinámico)
 *   y sólo cuando la sección entra en pantalla, para no cargar el bundle
 *   inicial de la home.
 * - El renderer y la cámara se dimensionan según el contenedor.
 * - La densidad de partículas se escala con el área disponible.
 * - Se detiene al salir de pantalla o si la pestaña pasa a segundo plano, y
 *   respeta `prefers-reduced-motion` (escena fija, sin avanzar el reloj).
 *
 * Toda la animación ocurre en GPU: por fotograma sólo se actualiza `uTime`.
 */

const PALETTE = {
  bg: 0x041a28, // navy muy oscuro (fondo + fog)
  deep: 0x0a2d45, // azul profundo
  cyan: 0x3edcff, // cian principal
  aqua: 0x7fefff, // cian claro
  ice: 0xb8f8ff, // casi blanco
};

/** Oleaje: lento y armónico, pero con relieve (no una sábana lisa). */
const WAVE = { amp: 3.4, speed: 1.18 };
const WAVE_MAX = 4.2; // altura cruda máx. aprox. (para normalizar el brillo)

/** Capas de superficie: densidad mayor cerca de la cámara, se abren al fondo. */
const SURFACE = [
  {
    count: 120000, xSpread: 78, zNear: 46, zFar: -80, zBias: 2.3,
    yJitter: 0.28, size: [1.4, 3.2], sizeScale: 34, opacity: 0.6, breathe: 1.15,
    colors: [PALETTE.aqua, PALETTE.ice, PALETTE.cyan],
  },
  {
    count: 70000, xSpread: 130, zNear: -48, zFar: -180, zBias: 1.4,
    yJitter: 0.45, size: [2.0, 4.0], sizeScale: 34, opacity: 0.4, breathe: 0.7,
    colors: [PALETTE.cyan, PALETTE.aqua, PALETTE.deep],
  },
  {
    count: 40000, xSpread: 210, zNear: -152, zFar: -330, zBias: 1.0,
    yJitter: 0.7, size: [2.6, 4.8], sizeScale: 34, opacity: 0.18, breathe: 0.4,
    colors: [PALETTE.deep, PALETTE.cyan],
  },
];

/** Partículas que nacen en la superficie, ascienden y se apagan. */
const RISING = {
  count: 20000, xSpread: 120, zNear: 44, zFar: -190, zBias: 1.7,
  size: [1.0, 2.6], sizeScale: 26, opacity: 0.7,
  rise: [7, 26], rate: [0.028, 0.07],
  colors: [PALETTE.ice, PALETTE.aqua],
};

/** Bancos de peces hechos de partículas que cruzan el mar bajo la superficie. */
const FISH = {
  count: 7, pts: 82, span: 155,
  laneZNear: 34, laneZFar: -230,
  scaleNear: 9.5, scaleFar: 2.4, scaleVar: [0.65, 1.5],
  hover: [-17, -5], speed: [0.09, 0.2],
  size: [1.5, 3.2], sizeScale: 30, opacity: 0.9,
  colors: [PALETTE.aqua, PALETTE.cyan, PALETTE.deep],
};

/* ── GLSL ─────────────────────────────────────────────────────────────────── */

/** Altura del océano con "domain warping": olas irregulares, como con viento. */
const GLSL_WAVE = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uSpeed;

  float waveHeight(vec2 p, float t) {
    p.x += t * 0.7;
    p.y -= t * 3.4;

    vec2 q = p;
    q.x += 6.5 * sin(p.y * 0.030 + t * 0.30);
    q.y += 5.8 * sin(p.x * 0.026 - t * 0.26);
    q.x += 3.6 * sin(p.y * 0.062 - t * 0.19);
    q.y += 3.0 * sin(p.x * 0.050 + t * 0.23);

    float h = 0.0;
    h += 0.98 * sin(q.x * 0.040 + t * 0.55);
    h += 0.82 * sin(q.y * 0.050 + t * 0.46);
    h += 0.64 * sin((q.x + q.y) * 0.032 - t * 0.40);
    h += 0.50 * sin((q.x * 0.7 - q.y * 0.9) * 0.075 + t * 0.60);
    h += 0.36 * sin(q.x * 0.120 + q.y * 0.090 + t * 0.72);
    h += 0.26 * sin(q.x * 0.190 - q.y * 0.160 + t * 0.88);
    h += 0.18 * sin((q.x + q.y) * 0.280 + t * 1.06);
    h += 0.12 * sin(q.x * 0.360 - q.y * 0.300 + t * 1.28);

    float env = 0.55 + 0.55
      * sin(p.x * 0.012 + p.y * 0.010 + t * 0.16)
      * sin(p.x * 0.017 - p.y * 0.008 - t * 0.11);
    return h * env;
  }
`;

/** Punto redondo con halo suave (sin texturas) + niebla. */
const PARTICLE_FRAG = /* glsl */ `
  precision highp float;
  uniform float uOpacity;
  uniform vec3  uFogColor;
  uniform float uFogDensity;
  varying vec3  vColor;
  varying float vAlpha;
  varying float vFog;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float glow = pow(smoothstep(0.5, 0.0, d), 1.6);
    float f = 1.0 - exp(-uFogDensity * uFogDensity * vFog * vFog);
    vec3 col = mix(vColor, uFogColor, f);
    float a = glow * vAlpha * uOpacity * (1.0 - f * 0.9);
    if (a < 0.003) discard;
    gl_FragColor = vec4(col, a);
  }
`;

const SURFACE_VERT = GLSL_WAVE + /* glsl */ `
  attribute vec2  aPos;
  attribute float aSize;
  attribute float aYoff;
  attribute float aPhase;
  attribute float aTwinkle;
  attribute vec3  aColor;
  uniform float uSizeScale;
  uniform float uPixelRatio;
  uniform float uBreathe;
  uniform vec3  uFogColor;
  varying vec3  vColor;
  varying float vAlpha;
  varying float vFog;

  const vec3 ICE     = vec3(0.722, 0.973, 1.0);
  const vec3 CALYPSO = vec3(0.16, 0.90, 0.85);

  float flareBand(vec2 pos, vec2 dir, float speed, float wl) {
    float ph = (dot(pos, dir) - speed * uTime) / wl;
    float s = sin(ph * 6.28318);
    return smoothstep(0.86, 1.0, s);
  }

  void main() {
    float t = uTime * uSpeed;
    float hRaw = waveHeight(aPos, t);
    float y = hRaw * uAmp + aYoff;
    vec4 mv = modelViewMatrix * vec4(aPos.x, y, aPos.y, 1.0);
    vFog = -mv.z;

    float hn = clamp(hRaw / ${WAVE_MAX.toFixed(1)} * 0.5 + 0.5, 0.0, 1.0);
    float crest = smoothstep(0.45, 1.0, hn);

    float breath = 0.55 + 0.45 * sin(uTime * uBreathe + aPhase);
    vec3 crestCol = mix(CALYPSO, ICE, smoothstep(0.82, 1.0, hn));
    vColor = mix(mix(uFogColor, aColor, 0.94), crestCol, crest);
    vColor *= (1.0 + crest * 1.7);
    vAlpha = mix(1.0, breath, aTwinkle) * (0.06 + 0.94 * pow(hn, 1.6));

    float asc = waveHeight(aPos, t + 0.18) - hRaw;
    float rising = smoothstep(0.0, 0.10, asc);
    float flare =
        flareBand(aPos, normalize(vec2( 1.0,  0.35)), 10.0, 46.0)
      + flareBand(aPos, normalize(vec2(-0.6,  1.00)),  7.0, 62.0)
      + flareBand(aPos, normalize(vec2( 0.25,-1.00)), 13.0, 74.0);
    flare = clamp(flare, 0.0, 1.0);
    float destello = flare * (0.2 + 0.8 * rising) * (0.35 + 0.65 * hn);
    vColor += CALYPSO * destello * 3.6;
    vAlpha = clamp(vAlpha + destello * 0.85, 0.0, 1.5);

    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uSizeScale * uPixelRatio * (0.7 + 1.15 * hn) / max(-mv.z, 1.0);
  }
`;

const RISING_VERT = GLSL_WAVE + /* glsl */ `
  attribute vec2  aPos;
  attribute float aSize;
  attribute float aRise;
  attribute float aRate;
  attribute float aSeed;
  attribute vec3  aColor;
  uniform float uSizeScale;
  uniform float uPixelRatio;
  varying vec3  vColor;
  varying float vAlpha;
  varying float vFog;
  void main() {
    float t = uTime;
    float life = fract(aSeed + t * aRate);
    float base = waveHeight(aPos, uTime * uSpeed) * uAmp;
    float y = base + life * aRise;
    float dx = sin(aSeed * 6.2831 + t * 0.4) * (0.6 + life * 1.6);
    vec4 mv = modelViewMatrix * vec4(aPos.x + dx, y, aPos.y, 1.0);
    vFog = -mv.z;
    vColor = aColor;
    vAlpha = sin(life * 3.14159);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uSizeScale * uPixelRatio * (1.0 + life * 0.6) / max(-mv.z, 1.0);
  }
`;

const FISH_VERT = GLSL_WAVE + /* glsl */ `
  attribute float aU;
  attribute float aV;
  attribute float aSize;
  attribute float aSeed;
  attribute float aSpeed;
  attribute float aLaneZ;
  attribute float aDirZ;
  attribute float aScale;
  attribute float aHover;
  attribute vec3  aColor;
  uniform float uSizeScale;
  uniform float uPixelRatio;
  varying vec3  vColor;
  varying float vAlpha;
  varying float vFog;

  const vec3 ICE = vec3(0.722, 0.973, 1.0);
  const float SPAN = ${FISH.span.toFixed(1)};

  float fishWidth(float u) {
    float body = 0.30 * sqrt(max(0.0, 1.0 - pow((u - 0.05) / 0.95, 2.0)));
    float tail = (u < -0.95) ? 0.26 * clamp((-0.95 - u) / 0.45, 0.0, 1.0) : 0.0;
    return max(body, tail);
  }

  void main() {
    float s = fract(aSeed + uTime * aSpeed);
    vec2 fwd = normalize(vec2(-1.0, aDirZ));
    vec2 side = vec2(-fwd.y, fwd.x);
    vec2 center = vec2(SPAN, aLaneZ) + fwd * (s * 2.0 * SPAN / abs(fwd.x));

    float width = fishWidth(aU);
    float tailMask = smoothstep(0.3, -1.35, aU);
    float swim = sin(aU * 3.4 - uTime * (7.0 + aSpeed * 22.0) + aSeed * 6.2831);
    float lateral = (aV * width + swim * 0.5 * tailMask) * aScale;
    vec2 xz = center + fwd * (aU * aScale) + side * lateral;

    float y = waveHeight(xz, uTime * uSpeed) * uAmp + aHover
            + sin(uTime * 2.2 + aSeed * 12.0) * 0.7;

    vec4 mv = modelViewMatrix * vec4(xz.x, y, xz.y, 1.0);
    vFog = -mv.z;

    float headT = smoothstep(-0.4, 1.0, aU);
    vColor = mix(aColor, ICE, headT * 0.5) * (0.85 + headT * 1.05);
    float edge = smoothstep(0.0, 0.05, s) * smoothstep(1.0, 0.93, s);
    vAlpha = edge * (0.6 + 0.4 * headT);

    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uSizeScale * uPixelRatio * (0.8 + 0.6 * headT) / max(-mv.z, 1.0);
  }
`;

export function OceanThree({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let teardown: (() => void) | null = null;
    let started = false;

    /** Carga Three.js y monta la escena. Se llama al entrar en pantalla. */
    const startScene = async () => {
      const [THREE, composerMod, renderPassMod, bloomMod, outputMod] =
        await Promise.all([
          import("three"),
          import("three/examples/jsm/postprocessing/EffectComposer.js"),
          import("three/examples/jsm/postprocessing/RenderPass.js"),
          import("three/examples/jsm/postprocessing/UnrealBloomPass.js"),
          import("three/examples/jsm/postprocessing/OutputPass.js"),
        ]);
      if (disposed) return;

      const { EffectComposer } = composerMod;
      const { RenderPass } = renderPassMod;
      const { UnrealBloomPass } = bloomMod;
      const { OutputPass } = outputMod;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let width = Math.max(1, host.clientWidth);
      let height = Math.max(1, host.clientHeight);

      // Densidad adaptada al área: la escena original es a pantalla completa.
      const quality = Math.min(1, Math.max(0.3, (width * height) / (1600 * 900)));

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(width, height);
      renderer.setClearColor(PALETTE.bg, 1);
      renderer.toneMapping = THREE.NoToneMapping;
      host.appendChild(renderer.domElement);
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(PALETTE.bg);
      scene.fog = new THREE.FogExp2(PALETTE.bg, 0.0062);
      const FOG_COLOR = new THREE.Color(PALETTE.bg);

      const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 900);
      camera.position.set(0, 16, 44);
      // El prototipo miraba a (0, 1, -130), encuadre pensado para pantalla
      // completa. Como aquí la sección es alta, ese encuadre dejaba media
      // sección de "cielo" vacío: se inclina la cámara para subir el horizonte
      // y que el oleaje ocupe más superficie.
      camera.lookAt(0, -8, -130);

      scene.add(
        new THREE.AmbientLight(PALETTE.deep, 0.6),
        new THREE.HemisphereLight(PALETTE.aqua, PALETTE.bg, 0.45),
        new THREE.DirectionalLight(PALETTE.cyan, 0.35),
      );

      const SHARED = {
        uTime: { value: 0 },
        uAmp: { value: WAVE.amp },
        uSpeed: { value: WAVE.speed },
      };

      const disposables: { dispose: () => void }[] = [];

      const baseMaterial = (
        vert: string,
        extra: Record<string, { value: number }>,
        fogDensity: number,
      ) => {
        const mat = new THREE.ShaderMaterial({
          uniforms: {
            uTime: SHARED.uTime,
            uAmp: SHARED.uAmp,
            uSpeed: SHARED.uSpeed,
            uSizeScale: { value: 30 },
            uPixelRatio: { value: renderer.getPixelRatio() },
            uOpacity: { value: 1 },
            uFogColor: { value: FOG_COLOR },
            uFogDensity: { value: fogDensity },
            ...extra,
          },
          vertexShader: vert,
          fragmentShader: PARTICLE_FRAG,
          transparent: true,
          depthTest: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        disposables.push(mat);
        return mat;
      };

      /** Muestreo de z sesgado hacia la cámara; el ancho crece con la distancia. */
      const sampleXZ = (
        cfg: { xSpread: number; zNear: number; zFar: number; zBias: number },
        i: number,
        aPos: Float32Array,
      ) => {
        const r = Math.pow(Math.random(), cfg.zBias);
        const z = cfg.zNear + (cfg.zFar - cfg.zNear) * r;
        const t = (cfg.zNear - z) / (cfg.zNear - cfg.zFar);
        const spread = cfg.xSpread * (0.7 + 0.6 * t);
        aPos[i * 2] = (Math.random() - 0.5) * 2 * spread;
        aPos[i * 2 + 1] = z;
      };

      const buildSurface = (cfg: (typeof SURFACE)[number]) => {
        const n = Math.round(cfg.count * quality);
        const aPos = new Float32Array(n * 2);
        const aSize = new Float32Array(n);
        const aYoff = new Float32Array(n);
        const aPhase = new Float32Array(n);
        const aTwinkle = new Float32Array(n);
        const aColor = new Float32Array(n * 3);
        const pal = cfg.colors.map((c) => new THREE.Color(c));
        const tmp = new THREE.Color();
        for (let i = 0; i < n; i++) {
          sampleXZ(cfg, i, aPos);
          aSize[i] = cfg.size[0] + Math.random() * (cfg.size[1] - cfg.size[0]);
          aYoff[i] = (Math.random() - 0.5) * 2 * cfg.yJitter;
          aPhase[i] = Math.random() * Math.PI * 2;
          aTwinkle[i] = Math.random() * Math.random();
          tmp.copy(pal[(Math.random() * pal.length) | 0]);
          aColor[i * 3] = tmp.r;
          aColor[i * 3 + 1] = tmp.g;
          aColor[i * 3 + 2] = tmp.b;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("aPos", new THREE.BufferAttribute(aPos, 2));
        geo.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
        geo.setAttribute("aYoff", new THREE.BufferAttribute(aYoff, 1));
        geo.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
        geo.setAttribute("aTwinkle", new THREE.BufferAttribute(aTwinkle, 1));
        geo.setAttribute("aColor", new THREE.BufferAttribute(aColor, 3));
        geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
        geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 700);
        disposables.push(geo);
        return new THREE.Points(
          geo,
          baseMaterial(
            SURFACE_VERT,
            {
              uSizeScale: { value: cfg.sizeScale },
              uOpacity: { value: cfg.opacity },
              uBreathe: { value: cfg.breathe },
            },
            0.0058,
          ),
        );
      };

      const buildRising = () => {
        const n = Math.round(RISING.count * quality);
        const aPos = new Float32Array(n * 2);
        const aSize = new Float32Array(n);
        const aRise = new Float32Array(n);
        const aRate = new Float32Array(n);
        const aSeed = new Float32Array(n);
        const aColor = new Float32Array(n * 3);
        const pal = RISING.colors.map((c) => new THREE.Color(c));
        const tmp = new THREE.Color();
        for (let i = 0; i < n; i++) {
          sampleXZ(RISING, i, aPos);
          aSize[i] = RISING.size[0] + Math.random() * (RISING.size[1] - RISING.size[0]);
          aRise[i] = RISING.rise[0] + Math.random() * (RISING.rise[1] - RISING.rise[0]);
          aRate[i] = RISING.rate[0] + Math.random() * (RISING.rate[1] - RISING.rate[0]);
          aSeed[i] = Math.random();
          tmp.copy(pal[(Math.random() * pal.length) | 0]);
          aColor[i * 3] = tmp.r;
          aColor[i * 3 + 1] = tmp.g;
          aColor[i * 3 + 2] = tmp.b;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("aPos", new THREE.BufferAttribute(aPos, 2));
        geo.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
        geo.setAttribute("aRise", new THREE.BufferAttribute(aRise, 1));
        geo.setAttribute("aRate", new THREE.BufferAttribute(aRate, 1));
        geo.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
        geo.setAttribute("aColor", new THREE.BufferAttribute(aColor, 3));
        geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
        geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 700);
        disposables.push(geo);
        return new THREE.Points(
          geo,
          baseMaterial(
            RISING_VERT,
            {
              uSizeScale: { value: RISING.sizeScale },
              uOpacity: { value: RISING.opacity },
            },
            0.0058,
          ),
        );
      };

      const buildFish = () => {
        const F = FISH.count;
        const P = FISH.pts;
        const N = F * P;
        const aU = new Float32Array(N);
        const aV = new Float32Array(N);
        const aSize = new Float32Array(N);
        const aSeed = new Float32Array(N);
        const aSpeed = new Float32Array(N);
        const aLaneZ = new Float32Array(N);
        const aDirZ = new Float32Array(N);
        const aScale = new Float32Array(N);
        const aHover = new Float32Array(N);
        const aColor = new Float32Array(N * 3);
        const pal = FISH.colors.map((c) => new THREE.Color(c));
        const tmp = new THREE.Color();

        // Plantilla de silueta compartida por todos los peces.
        const tu = new Float32Array(P);
        const tv = new Float32Array(P);
        const ts = new Float32Array(P);
        for (let i = 0; i < P; i++) {
          tu[i] = -1.35 + Math.random() * 2.35;
          tv[i] = Math.random() * 2 - 1;
          ts[i] = FISH.size[0] + Math.random() * (FISH.size[1] - FISH.size[0]);
        }

        let k = 0;
        for (let f = 0; f < F; f++) {
          const seed = Math.random();
          const speed = FISH.speed[0] + Math.random() * (FISH.speed[1] - FISH.speed[0]);
          const dl = Math.random();
          const laneZ = FISH.laneZNear + (FISH.laneZFar - FISH.laneZNear) * dl;
          const sVar =
            FISH.scaleVar[0] + Math.random() * (FISH.scaleVar[1] - FISH.scaleVar[0]);
          const scale = (FISH.scaleNear + (FISH.scaleFar - FISH.scaleNear) * dl) * sVar;
          const hover = FISH.hover[0] + Math.random() * (FISH.hover[1] - FISH.hover[0]);
          const dirZ = (Math.random() * 2 - 1) * 0.3;
          tmp.copy(pal[(Math.random() * pal.length) | 0]);
          for (let i = 0; i < P; i++) {
            aU[k] = tu[i];
            aV[k] = tv[i];
            aSize[k] = ts[i] * (0.7 + (1 - dl));
            aSeed[k] = seed;
            aSpeed[k] = speed;
            aLaneZ[k] = laneZ;
            aDirZ[k] = dirZ;
            aScale[k] = scale;
            aHover[k] = hover;
            aColor[k * 3] = tmp.r;
            aColor[k * 3 + 1] = tmp.g;
            aColor[k * 3 + 2] = tmp.b;
            k++;
          }
        }

        const geo = new THREE.BufferGeometry();
        const set = (name: string, arr: Float32Array, sz: number) =>
          geo.setAttribute(name, new THREE.BufferAttribute(arr, sz));
        set("aU", aU, 1);
        set("aV", aV, 1);
        set("aSize", aSize, 1);
        set("aSeed", aSeed, 1);
        set("aSpeed", aSpeed, 1);
        set("aLaneZ", aLaneZ, 1);
        set("aDirZ", aDirZ, 1);
        set("aScale", aScale, 1);
        set("aHover", aHover, 1);
        set("aColor", aColor, 3);
        geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
        geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), FISH.span * 2.2);
        disposables.push(geo);
        return new THREE.Points(
          geo,
          baseMaterial(
            FISH_VERT,
            {
              uSizeScale: { value: FISH.sizeScale },
              uOpacity: { value: FISH.opacity },
            },
            0.005,
          ),
        );
      };

      const points = [...SURFACE.map(buildSurface), buildRising(), buildFish()];
      points.forEach((p) => scene.add(p));

      // Bloom sutil: halos alrededor de las partículas.
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        0.95, // intensidad
        0.62, // radio
        0.08, // umbral
      );
      composer.addPass(bloom);
      composer.addPass(new OutputPass());
      composer.setSize(width, height);

      const clock = new THREE.Clock();
      let elapsed = 0;
      let rafId = 0;
      let onScreen = true;
      let tabVisible = !document.hidden;

      const renderFrame = () => {
        SHARED.uTime.value = elapsed;
        composer.render();
      };

      const loop = () => {
        const delta = clock.getDelta();
        if (!reduced) elapsed += delta;
        renderFrame();
        rafId = requestAnimationFrame(loop);
      };

      const sync = () => {
        const shouldRun = onScreen && tabVisible;
        if (shouldRun && !rafId) {
          clock.getDelta(); // descarta el salto acumulado durante la pausa
          rafId = requestAnimationFrame(loop);
        } else if (!shouldRun && rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      };

      const onVisibility = () => {
        tabVisible = !document.hidden;
        sync();
      };

      const resize = () => {
        width = Math.max(1, host.clientWidth);
        height = Math.max(1, host.clientHeight);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        composer.setSize(width, height);
        bloom.setSize(width, height);
        const pr = renderer.getPixelRatio();
        points.forEach((p) => {
          const mat = p.material as InstanceType<typeof THREE.ShaderMaterial>;
          mat.uniforms.uPixelRatio.value = pr;
        });
        renderFrame();
      };

      const ro = new ResizeObserver(resize);
      ro.observe(host);

      const io = new IntersectionObserver(
        (entries) => {
          onScreen = entries[0]?.isIntersecting ?? false;
          sync();
        },
        { rootMargin: "150px" },
      );
      io.observe(host);

      document.addEventListener("visibilitychange", onVisibility);
      renderFrame();
      sync();

      teardown = () => {
        if (rafId) cancelAnimationFrame(rafId);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        composer.dispose();
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    // Sólo se descarga Three.js cuando la sección se acerca al viewport. Si el
    // dispositivo no soporta WebGL (o falla la carga), la sección simplemente
    // se queda con su fondo navy: es decorativa, no debe romper la página.
    const trigger = new IntersectionObserver(
      (entries) => {
        if (!started && entries.some((e) => e.isIntersecting)) {
          started = true;
          trigger.disconnect();
          startScene().catch(() => {
            teardown?.();
            teardown = null;
          });
        }
      },
      { rootMargin: "400px" },
    );
    trigger.observe(host);

    return () => {
      disposed = true;
      trigger.disconnect();
      teardown?.();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}
