import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import { loadUsers, loadUsersSuccess } from './user.actions';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class UserEffects {
  loadUsers$;

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {
    this.loadUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadUsers),
        switchMap(({ searchText }) =>
          this.userService.getUsers(searchText).pipe(
            map(users => loadUsersSuccess({ users }))
          )
        )
      )
    );
  }
}
