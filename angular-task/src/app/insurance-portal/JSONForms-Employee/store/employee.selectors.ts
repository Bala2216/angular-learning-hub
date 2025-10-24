import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Employee } from '../models/employee.model';

export const selectEmployeeState =
  createFeatureSelector<Employee[]>('employees');

export const selectEmployees = createSelector(
  selectEmployeeState,
  (employees) => employees
);
