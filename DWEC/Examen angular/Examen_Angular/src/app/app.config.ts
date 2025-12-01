import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// Este es el archivo de CONFIGURACIÓN principal de Angular
// Aquí le decimos a Angular qué servicios y funcionalidades queremos usar
export const appConfig: ApplicationConfig = {
  providers: [
    // Esto activa el manejo global de errores en el navegador
    provideBrowserGlobalErrorListeners(),
    
    // Esto activa el sistema de rutas (navegación entre páginas)
    // Le pasamos nuestro archivo de rutas para que sepa qué URL carga qué componente
    provideRouter(routes)
  ]
};
