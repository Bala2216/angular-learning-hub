import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../services/user.service';

export const selectUserState = createFeatureSelector<User[]>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (users) => users
);
