import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

// Solo llamamos a bootstrapApplication una vez.
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Esto incluye el servicio HTTP necesario
    ...appConfig.providers // Agregar las configuraciones adicionales de appConfig si es necesario
  ]
})
  .catch((err) => console.error('Error al iniciar la aplicación', err));
