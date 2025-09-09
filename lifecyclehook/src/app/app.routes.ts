import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '', // No leading slash
    component: AppComponent,
  },
  {
    path: 'jsonform', // Remove leading slash
    loadComponent: () =>
      import('./jsonform/jsonform.component').then((m) => m.JsonformComponent),
  },
];
