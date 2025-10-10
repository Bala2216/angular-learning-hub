import { createAction, props } from '@ngrx/store';
import { AdvancedUserFormModel } from '../../models/advanced-user-form';

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: AdvancedUserFormModel[] }>()
);
export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: any }>()
);

export const addUser = createAction(
  '[Users] Add User',
  props<{ user: any }>()
);
