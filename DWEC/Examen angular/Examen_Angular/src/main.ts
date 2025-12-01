// Este es el archivo de ENTRADA principal de la aplicación Angular
// Es el primer archivo TypeScript que se ejecuta cuando arranca la app

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// bootstrapApplication es la función que ARRANCA la aplicación
// Le pasamos:
// 1. App: el componente principal (raíz) de la aplicación
// 2. appConfig: la configuración (rutas, servicios, etc.)
bootstrapApplication(App, appConfig)
  // .catch captura cualquier error que ocurra al arrancar y lo muestra en la consola
  .catch((err) => console.error(err));
