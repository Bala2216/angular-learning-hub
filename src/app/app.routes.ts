import { Routes } from '@angular/router';
import { EmployeeOnbordingComponent } from './employee-onbording/employee-onbording.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffComponent } from './staff/staff.component';
import { EmployeeListComponent as StateEmployeeListComponent } from './state/employee-list.component';
import { EmployeeFormComponent as StateEmployeeFormComponent} from './state/employee-form.component';
export const routes: Routes = [
    { path : '', component: DashboardComponent },
    { path: 'list', component: EmployeeListComponent },
    { path: 'employee-onboard', component: EmployeeOnbordingComponent },
    { path: 'staff-onboard', component: StaffComponent },
    { path: 'state-employee-onbording', component: StateEmployeeFormComponent },
    { path: 'state-employee-list', component: StateEmployeeListComponent },
    { path: '**', redirectTo: '' }            // wildcard for invalid routes
];
