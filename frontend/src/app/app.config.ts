import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { providePrimeNG } from 'primeng/config';
import { userReducer } from '../enitities/user/model/store/reducer';
import { UserEffects } from '../enitities/user/model/store/user-effects';
import { authInterceptor } from '../features/auth/auth-interceptor';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    providePrimeNG({
        theme: {
            preset: Aura,
        }
    }),
    provideAnimationsAsync(),
    provideStore({ users: userReducer }),
    provideEffects(UserEffects),
]
};
