// src/app/state/employee.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from './employee.reducer';

// Select the entire 'employees' feature state
export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

// From that state, select the employees array
export const selectAllEmployees = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.employees
);