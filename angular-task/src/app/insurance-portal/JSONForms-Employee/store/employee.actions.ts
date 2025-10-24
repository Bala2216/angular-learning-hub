import { createAction, props } from '@ngrx/store';
import { Employee } from '../models/employee.model';

export const loadEmployees = createAction('[Employee] Load Employees');
export const loadEmployeesSuccess = createAction(
  '[Employee] Load Employees Success',
  props<{ employees: Employee[] }>()
);
export const loadEmployeesFailure = createAction(
  '[Employee] Load Employees Failure',
  props<{ error: any }>()
);
export const addEmployee = createAction(
  '[Employee] Add Employee',
  props<{ employee: Employee }>()
);
