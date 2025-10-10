import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { advancedUserFormService } from '../../services/advanced-user-form-service';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userService: advancedUserFormService
  ) {}

  
loadUsers$ = createEffect(() => 
  this.actions$.pipe(
    ofType(UsersActions.loadUsers),
    mergeMap(() =>
      this.userService.getUsers().pipe(
        map((response) =>
          UsersActions.loadUsersSuccess({
            users: response.users.map((user: any) => ({
              ...user,
              fullName: `${user.firstName} ${user.lastName}`,
              gender: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
            })),
          })
        ),
        catchError((error) => of(UsersActions.loadUsersFailure({ error })))
      )
    )
  )
);


//   loadUsers$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(UsersActions.loadUsers),
//       mergeMap(() =>
//         this.userService.getUsers().pipe(
//           map((response) =>
//             UsersActions.loadUsersSuccess({
//               users: response.users.map((user: any) => ({
//                 ...user,
//                 fullName: `${user.firstName} ${user.lastName}`,
//                 gender:
//                   user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
//               })),
//             })
//           ),
//           catchError((error) =>
//             of(UsersActions.loadUsersFailure({ error }))
//           )
//         )
//       )
//     )
//   );
}
