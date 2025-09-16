// src/app/state/employee.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addEmployee } from './employee.actions';
import { Employee } from './employee.model';

export interface EmployeeState {
  employees: Employee[];
}

export const initialState: EmployeeState = {
  employees: [
    { id: '1', name: 'Jane Doe' } // Some initial data
  ],
};

export const employeeReducer = createReducer(
  initialState,
  on(addEmployee, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee], // Add the new employee to the array
  }))
);