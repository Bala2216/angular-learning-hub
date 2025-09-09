import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'reactiveform',
    loadComponent: () =>
      import('./reactiveform/reactiveform.component').then(
        (m) => m.ReactiveformComponent
      ),
  },
  {
    path: 'jsonform',
    loadComponent: () =>
      import('./jsonform/jsonform.component').then((m) => m.JsonformComponent),
  },
];
