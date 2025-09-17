import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login-component/login-component';
import { LayoutComponent } from './pages/layout-component/layout-component';
import { DashboardComponent } from './pages/dashboard-component/dashboard-component';
import { EmployeeComponent } from './pages/employee-component/employee-component';
import { EmployeeFeedbackComponent } from './pages/employee-feedback-component/employee-feedback-component';
import { UserComponent } from './pages/user-component/user-component';
import { JsonFormsFeedbackComponent } from './pages/json-forms-feedback-component/json-forms-feedback-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'employee',
        component: EmployeeComponent
      },
      {
        path: 'feedback',
        component: EmployeeFeedbackComponent
      },
      {
        path: 'users',
        component: UserComponent
      },
      {
        path: 'jsonFeedback',
        component: JsonFormsFeedbackComponent
      }
    ]
  }

];
