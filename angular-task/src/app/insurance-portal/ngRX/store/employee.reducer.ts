import { createReducer, on } from '@ngrx/store';
import { Employee } from './employee.model';
import { addEmployee, addEmployeeSuccess, deleteEmployee, deleteEmployeeSuccess, loadEmployeesSuccess, updateEmployee } from './employee.actions';

export interface EmployeeState {
  employees: Employee[];
}

export const initialState: EmployeeState = {
  employees: [],
};

export const employeeReducer = createReducer(
  initialState,
  on(loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
  })),
  on(addEmployee, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
  })),
  on(addEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
  })),
  on(updateEmployee, (state, { employee }) => ({
    ...state,
    employees: state.employees.map((e) =>
      e.id === employee.id ? employee : e
    ),
  })),
  on(deleteEmployee, (state, { id }) => ({
    ...state,
    employees: state.employees.filter((e) => e.id !== id),
  })),
  on(deleteEmployeeSuccess, (state, { id }) => ({
    ...state,
    employees: state.employees.filter((e) => e.id !== id),
  }))
);
