import { Routes } from '@angular/router';
import { ClaimFormComponent } from './insurance-portal/components/claim-form/claim-form.component';
import { DashboardComponent } from './insurance-portal/components/dashboard/dashboard.component';
import { LoginComponent } from './insurance-portal/components/login/login.component';
import { RegisterComponent } from './insurance-portal/components/register/register.component';
import { AdminGuard } from './insurance-portal/guard/admin.guard';
import { LayoutComponent } from './insurance-portal/components/layout/layout.component';
import { getProductsResolver } from './insurance-portal/ngRX/products/modules/product/resolvers/get-products.resolver';

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
        loadComponent: () =>
          import(
            '../app/insurance-portal/components/claim-list/claim-list.component'
          ).then((m) => m.ClaimListComponent),
        canActivate: [AdminGuard],
      },
      { path: 'submit', component: ClaimFormComponent },
      {
        path: 'users',
        loadComponent: () =>
          import(
            '../app/insurance-portal/components/users/users.component'
          ).then((m) => m.UsersComponent),
      },
      {
        path: 'employee-form',
        loadComponent: () =>
          import(
            '../app/insurance-portal/jsonforms/components/employee-form.component'
          ).then((m) => m.EmployeeFormComponent),
      },

      {
        path: 'employee',
        loadComponent: () =>
          import(
            '../app/insurance-portal/ngRX/employees/employees.component'
          ).then((m) => m.EmployeesComponent),
      },

      {
        path: 'dx-datagrid',
        loadComponent: () =>
          import(
            '../app/insurance-portal/devExtrme/dx-datagrid.component'
          ).then((m) => m.DxDataGridComponent),
      },
      // {
      //   path: 'counter',
      //   loadComponent: () =>
      //     import('../app/insurance-portal/ngRX/counter/counter.component').then(
      //       (m) => m.CounterComponent
      //     ),
      // },
      {
        path: 'shopping',
        loadChildren: () =>
          import('./insurance-portal/shopping-cart/shopping-cart.routes').then(
            (m) => m.SHOPPING_CART_ROUTES
          ),
      },
      {
        path: 'employee-step',
        loadComponent: () =>
          import(
            '../app/insurance-portal/JSONForms-Employee/components/employee-stepper/employee-stepper.component'
          ).then((m) => m.EmployeeStepperComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import(
            '../app/insurance-portal/ngRX/products/modules/product/pages/home-product/home-product.component'
          ).then((m) => m.HomeProductComponent),
        resolve: { products: getProductsResolver },
        data: { title: 'Products' },
      },
      {
        path: 'dashboard-products',
        loadComponent: () =>
          import(
            '../app/product-dashboard/components/dashboard.component'
          ).then((m) => m.DashboardComponent),
      },
      // {
      //   path: 'favorites',
      //   loadComponent: () =>
      //     import(
      //       '../app/insurance-portal/ngRX/products/modules/favorite-product/pages/home-favorite-product/home-favorite-product.component'
      //     ).then((m) => m.HomeFavoriteProductComponent),
      //   data: { title: 'Favotire Products' },
      // },
      { path: '', redirectTo: 'submit', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
