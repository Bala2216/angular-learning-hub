import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFormsModule } from '@jsonforms/angular';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../../models/employee.model';
import {
  personalSchema,
  personalUISchema,
} from '../../schemas/personal.schema';
import { contactSchema, contactUISchema } from '../../schemas/contact.schema';
import { jobSchema, jobUISchema } from '../../schemas/job.schema';
import { EmployeeService } from '../../services/employee.service';
import { Store } from '@ngrx/store';
import { addEmployee } from '../../store/employee.actions';
import { ChangeDetectorRef, inject } from '@angular/core';

@Component({
  selector: 'app-employee-stepper',
  standalone: true,
  templateUrl: './employee-stepper.component.html',
  imports: [CommonModule, JsonFormsModule, MatStepperModule, MatButtonModule],
})
export class EmployeeStepperComponent implements OnInit {
  step = 0;
  schemasReady = false;

  personalData: Partial<Employee> = {};
  contactData: Partial<Employee> = {};
  jobData: Partial<Employee> = {};
  schemas: any[] = [];

  renderers = angularMaterialRenderers;

  private store = inject(Store);
  private employeeService = inject(EmployeeService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.employeeService.getAll().subscribe({
      next: (employees) => {
        const first = employees[0];
        this.personalData = {
          firstName: first?.firstName ?? '',
          lastName: first?.lastName ?? '',
        };
        this.contactData = {
          email: first?.email ?? '',
          phone: first?.phone ?? '',
        };
        this.jobData = {
          position: first?.position ?? '',
          department: first?.department ?? '',
        };

        this.schemas = [
          {
            schema: personalSchema,
            uiSchema: personalUISchema,
            data: this.personalData,
          },
          {
            schema: contactSchema,
            uiSchema: contactUISchema,
            data: this.contactData,
          },
          { schema: jobSchema, uiSchema: jobUISchema, data: this.jobData },
        ];

        this.schemasReady = true;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Load failed:', err),
    });
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  submit() {
    const employee: Employee = {
      ...(this.personalData as Employee),
      ...(this.contactData as Employee),
      ...(this.jobData as Employee),
    };
    this.store.dispatch(addEmployee({ employee }));
  }
}
