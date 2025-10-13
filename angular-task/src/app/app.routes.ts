import { Routes } from '@angular/router';
import { ClaimFormComponent } from './insurance-portal/components/claim-form/claim-form.component';
import { ClaimListComponent } from './insurance-portal/components/claim-list/claim-list.component';
import { DashboardComponent } from './insurance-portal/components/dashboard/dashboard.component';
import { LoginComponent } from './insurance-portal/components/login/login.component';
import { RegisterComponent } from './insurance-portal/components/register/register.component';
import { AdminGuard } from './insurance-portal/guard/admin.guard';
import { LayoutComponent } from './insurance-portal/components/layout/layout.component';
import { UsersComponent } from './insurance-portal/components/users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'claims',
        component: ClaimListComponent,
        canActivate: [AdminGuard],
      },
      { path: 'submit', component: ClaimFormComponent },
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: 'submit', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
