import { getPayload, type Payload } from "payload";
import config from "@payload-config";

/**
 * Cliente de Payload (Local API) cacheado a nivel de módulo. En los Server
 * Components y en generación estática se consulta la base de datos directamente,
 * sin pasar por HTTP, reutilizando una única instancia por proceso.
 */
let cached: Promise<Payload> | undefined;

export const getCms = (): Promise<Payload> => {
  if (!cached) {
    cached = getPayload({ config });
  }
  return cached;
};
