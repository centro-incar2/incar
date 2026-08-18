import * as migration_20260814_122316_inicial from './20260814_122316_inicial';
import * as migration_20260814_163551_equipos from './20260814_163551_equipos';
import * as migration_20260814_173736_paginas from './20260814_173736_paginas';
import * as migration_20260814_182322_paginas2 from './20260814_182322_paginas2';
import * as migration_20260814_184603_lineas from './20260814_184603_lineas';
import * as migration_20260814_205322_documentos from './20260814_205322_documentos';
import * as migration_20260818_194801_contacto from './20260818_194801_contacto';

export const migrations = [
  {
    up: migration_20260814_122316_inicial.up,
    down: migration_20260814_122316_inicial.down,
    name: '20260814_122316_inicial',
  },
  {
    up: migration_20260814_163551_equipos.up,
    down: migration_20260814_163551_equipos.down,
    name: '20260814_163551_equipos',
  },
  {
    up: migration_20260814_173736_paginas.up,
    down: migration_20260814_173736_paginas.down,
    name: '20260814_173736_paginas',
  },
  {
    up: migration_20260814_182322_paginas2.up,
    down: migration_20260814_182322_paginas2.down,
    name: '20260814_182322_paginas2',
  },
  {
    up: migration_20260814_184603_lineas.up,
    down: migration_20260814_184603_lineas.down,
    name: '20260814_184603_lineas',
  },
  {
    up: migration_20260814_205322_documentos.up,
    down: migration_20260814_205322_documentos.down,
    name: '20260814_205322_documentos',
  },
  {
    up: migration_20260818_194801_contacto.up,
    down: migration_20260818_194801_contacto.down,
    name: '20260818_194801_contacto'
  },
];
