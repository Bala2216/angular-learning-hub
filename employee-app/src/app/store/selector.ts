import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './reducer';


export const selectUserState = createFeatureSelector<UserState>('users');

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
)

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
)
