import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { cartReducer, userReducer } from './ngRX2/store/user.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './ngRX2/store/user.effects';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { employeeReducer } from './insurance-portal/ngRX/store/employee.reducer';
import { EmployeeEffects } from './insurance-portal/ngRX/store/employee.effects';
import { counterReducer } from './insurance-portal/ngRX/counter/store/counter.reducer';
import { employeeReducer1 } from './insurance-portal/JSONForms-Employee/store/employee.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideStore({
      userState: userReducer,
      cart: cartReducer,
      employees: employeeReducer,
      counter: counterReducer,
      employees1: employeeReducer1,
    }),
    provideEffects([UserEffects, EmployeeEffects]),
    provideStoreDevtools()
    //provideHttpClientTesting(), // if using jest unit testing enable
  ],
};
