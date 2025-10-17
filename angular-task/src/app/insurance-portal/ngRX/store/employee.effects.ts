import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../employees/employee.service';
import * as EmployeeActions from './employee.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  addEmployee,
  addEmployeeSuccess,
  deleteEmployee,
  deleteEmployeeSuccess,
  loadEmployees,
  updateEmployee,
} from './employee.actions';

@Injectable()
export class EmployeeEffects {
  private actions$ = inject(Actions);
  private service = inject(EmployeeService);

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addEmployee),
      mergeMap(({ employee }) =>
        this.service.add(employee).pipe(
          map((newEmployee) => addEmployeeSuccess({ employee: newEmployee })),
          catchError(() => of({ type: '[Employee] Add Failed' }))
        )
      )
    )
  );

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((employees) =>
            EmployeeActions.loadEmployeesSuccess({ employees })
          ),
          catchError(() => of({ type: '[Employee] Load Failed' }))
        )
      )
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateEmployee),
      mergeMap(({ employee }) =>
        this.service.update(employee).pipe(
          map(() => loadEmployees()),
          catchError(() => of({ type: '[Employee] Update Failed' }))
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteEmployee),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => deleteEmployeeSuccess({ id })),
          catchError(() => of({ type: '[Employee] Delete Failed' }))
        )
      )
    )
  );
}
