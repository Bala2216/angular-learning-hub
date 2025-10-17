import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFormsAngularService } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../../services/employee.service';
import { employeeSchema } from '../employee.schema';
import {
  personalUISchema,
  jobUISchema,
  statusUISchema,
} from '../../jsonforms/employee.uischema';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    JsonFormsAngularMaterialModule,
    MatStepperModule,
    MatButtonModule,
    MatTableModule,
  ],
  providers: [JsonFormsAngularService],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  schema = employeeSchema;
  renderers = angularMaterialRenderers;
  personalUISchema = personalUISchema;
  jobUISchema = jobUISchema;
  statusUISchema = statusUISchema;

  employees: any[] = [];
  displayedColumns = ['name', 'email', 'jobTitle'];
  data: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    department: '',
    experience: null,
    salary: null,
    isActive: false,
    gender: '',
    age: null,
  };

  private employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.loadEmployees();
  }

  onChange(event: any): void {
    console.log(event.data, 'event');
    if (!event?.data) return;

    this.data = {
      ...this.data,
      ...event.data,
    };
  }

  submit(): void {
    this.employeeService.addEmployee(this.data).subscribe({
      next: () => {
        this.loadEmployees();
        this.data = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          jobTitle: '',
          department: '',
          experience: null,
          salary: null,
          isActive: false,
          gender: '',
          age: null,
        };
      },
      error: (err) => console.error('Submit failed:', err),
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (res) => (this.employees = res),
      error: (err) => console.error('Load failed:', err),
    });
  }
}
