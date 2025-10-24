import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../services/employee.service';
import {
  loadEmployees,
  loadEmployeesSuccess,
  loadEmployeesFailure,
} from './employee.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployees),
      mergeMap(() =>
        this.employeeService.getAll().pipe(
          map((employees) => loadEmployeesSuccess({ employees })),
          catchError((error) => of(loadEmployeesFailure({ error })))
        )
      )
    )
  );
}
