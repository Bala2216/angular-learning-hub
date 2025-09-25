import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
// --- NgRx Imports for Standalone ---
import { provideStore } from '@ngrx/store';
import { employeeReducer } from './state/employee.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), 
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
     // --- Register the NgRx Store and Reducers ---
    // This is the standalone equivalent of StoreModule.forRoot()
    provideStore({ employees: employeeReducer })
  ]
};
