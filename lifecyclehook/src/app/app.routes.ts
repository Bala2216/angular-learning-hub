import { Routes } from '@angular/router';

export const routes: Routes = [
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
