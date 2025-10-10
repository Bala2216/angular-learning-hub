import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('usersState');

export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users
);
