import { createAction, props } from '@ngrx/store';
import { User } from './model';

export const loadUser = createAction('[User] Load User');

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{users: User[]}>()
)
