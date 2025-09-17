import { createReducer, on } from '@ngrx/store';
import { loadUsersSuccess, addUser } from './user.actions';
import { User } from '../../services/user.service';

export interface UserState {
  users: User[];
}

export const initialState: UserState = {
  users: []
};

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(addUser, (state, { user }) => ({ ...state, users: [...state.users, user] }))
);
