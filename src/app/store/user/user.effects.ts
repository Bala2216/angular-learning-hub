import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUsers, setUsers } from './user.actions';
import { UserService } from '../../services/user.service';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() => {
        const stored = localStorage.getItem('userState');
        if (stored) {
          const users = JSON.parse(stored);
          return of(setUsers({ users }));
        } else {
          return this.userService.getUsers().pipe(
            map(users => {
              localStorage.setItem('userState', JSON.stringify(users));
              return setUsers({ users });
            }),
            catchError(() => of(setUsers({ users: [] })))
          );
        }
      })
    )
  );
}
