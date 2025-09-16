// src/app/employee-list/employee-list.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../state/employee.model';
import { selectAllEmployees } from '../state/employee.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  template: `
    <h3>Employee List</h3>
    <ul>
      <li *ngFor="let employee of employees$ | async">
        {{ employee.name }}
      </li>
    </ul>
  `,
})
export class EmployeeListComponent {
  // Create an observable to hold the stream of data from the store
  employees$: Observable<Employee[]>;

  constructor(private store: Store) {
    // Use the selector to get the data
    this.employees$ = this.store.select(selectAllEmployees);
  }
}