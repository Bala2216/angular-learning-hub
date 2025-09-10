import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { ForgetPassword } from './forget-password/forget-password';
import { Dashboard } from './dashboard/dashboard';
import { FormRendererComponent } from './form-renderer/form-renderer';
import { Products } from './Hooks/products/products';
import { Onboarding } from './employee/onboarding/onboarding';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'forgotPassword', component: ForgetPassword },
    { path: 'employee/onBoarding', component: FormRendererComponent },
    { path: 'dashboard', component: Dashboard },
    { path: 'products', component: Products },
    { path: 'user', component: Onboarding }
    // { path: 'rxjsbasic', component: Rxjsbasic }
];
