// src/app/employee-form/employee-form.component.ts
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addEmployee } from '../state/employee.actions';
import { Employee } from '../state/employee.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeListComponent } from './employee-list.component';
@Component({
  selector: 'app-employee-form',
  template: `
    <app-employee-list></app-employee-list>
    <h3>Add New Employee</h3>
    <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="name" placeholder="Employee Name" />
      <button type="submit">Add</button>
    </form>
  `,
    imports: [ ReactiveFormsModule, CommonModule, EmployeeListComponent],

})
export class EmployeeFormComponent {
  employeeForm = new FormGroup({
    name: new FormControl(''),
  });

  // Inject the NgRx Store
  constructor(private store: Store) {}

  onSubmit(): void {
    const newEmployee: Employee = {
      id: Date.now().toString(), // Simple unique ID
      name: this.employeeForm.value.name || 'No Name',
    };
    console.log("hello", newEmployee)
    // Dispatch the action to the store
    this.store.dispatch(addEmployee({ employee: newEmployee }));

    this.employeeForm.reset();
  }
}