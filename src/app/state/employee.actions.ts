// src/app/state/employee.actions.ts
import { createAction, props } from '@ngrx/store';
import { Employee } from './employee.model';

export const addEmployee = createAction(
  '[Employee Form] Add Employee',
  props<{ employee: Employee }>()
);