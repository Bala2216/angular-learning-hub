import { createReducer, on } from '@ngrx/store';
import { addEmployee, loadEmployeesSuccess } from './employee.actions';
import { Employee } from '../models/employee.model';

export const initialState: Employee[] = [];

export const employeeReducer1 = createReducer(
  initialState,
  on(loadEmployeesSuccess, (state, { employees }) => [...employees]),
  on(addEmployee, (state, { employee }) => [...state, employee])
);
