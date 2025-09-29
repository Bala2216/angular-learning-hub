import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CombinedService } from '../services/combined.service';
import * as CombinedActions from './combined.actions';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
} from 'rxjs';

@Injectable()
export class CombinedEffects {
  constructor(private actions$: Actions, private service: CombinedService) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CombinedActions.loadCombined),
      switchMap(() =>
        this.service.getCombinedData('').pipe(
          map((data) => CombinedActions.loadCombinedSuccess({ data })),
          catchError((error) =>
            of(CombinedActions.loadCombinedFailure({ error }))
          )
        )
      )
    )
  );

  search$ = createEffect(() =>
    this.actions$?.pipe(
      ofType(CombinedActions.searchCombined),
      debounceTime(300),
      distinctUntilChanged((a, b) => a.term === b.term),
      switchMap((action) => {
        console.log('Service:', this.service); // ✅ Should NOT be undefined
        const result = this.service.getCombinedData(action.term);
        console.log('Result:', result); // ✅ Should be an Observable
        return result.pipe(
          map((data) => CombinedActions.loadCombinedSuccess({ data })),
          catchError((error) =>
            of(CombinedActions.loadCombinedFailure({ error }))
          )
        );
      })
    )
  );
}
