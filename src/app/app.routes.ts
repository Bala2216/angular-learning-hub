import { Routes } from '@angular/router';
import { EmployeeOnbordingComponent } from './employee-onbording/employee-onbording.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffComponent } from './staff/staff.component';
export const routes: Routes = [
    { path : '', component: DashboardComponent },
    { path: 'list', component: EmployeeListComponent },
    { path: 'employee-onboard', component: EmployeeOnbordingComponent },
    { path: 'staff-onboard', component: StaffComponent },
    { path: '**', redirectTo: '' }            // wildcard for invalid routes
];
