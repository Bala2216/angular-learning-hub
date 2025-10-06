import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import { loadUsers, loadUsersSuccess, loadPhotosSuccess } from './user.actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
    
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService
          .getUsers()
          .pipe(map((users) => loadUsersSuccess({ users })))
      )
    )
  );

  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService
          .getPhotos()
          .pipe(map((photos) => loadPhotosSuccess({ photos })))
      )
    )
  );
}
