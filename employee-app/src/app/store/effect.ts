import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../service/user-service';
import { loadUser, loadUserSuccess } from './action';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class UserEffects {

  actions$ = inject(Actions);

  constructor(private userService : UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users: any) => loadUserSuccess({users}))
        )
      ))
    )
}
