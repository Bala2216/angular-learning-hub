import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { AdvancedUserFormModel } from '../../models/advanced-user-form';

export interface UsersState {
  users: AdvancedUserFormModel[];
  error: any;
}

export const initialState: UsersState = {
  users: [],
  error: null,
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    error: null,
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UsersActions.addUser, (state, { user }) => ({
    ...state,
    users: [user, ...state.users],
  }))
);
