import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItDeptFormComponent } from './it-dept-form/it-dept-form.component';
import { NewEmployeeDataComponent } from './new-employee-data/new-employee-data.component';
import { ViewAllEmployeesComponent } from './view-all-employees/view-all-employees.component';
import { FinanceDeptFormComponent } from './finance-dept-form/finance-dept-form.component';
import { HrDeptFormComponent } from './hr-dept-form/hr-dept-form.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'it-dept-form', component: ItDeptFormComponent },
  { path: 'new-user', component: NewEmployeeDataComponent },
  { path: 'view-all-employees', component: ViewAllEmployeesComponent },
  { path: 'finance-dept-form', component: FinanceDeptFormComponent },
  { path: 'hr-dept-form', component: HrDeptFormComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
