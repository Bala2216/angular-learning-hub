
import { createReducer, on } from '@ngrx/store';
import { addUser, setUsers } from './user.actions';
import { User } from '../../services/user.service';

export const initialState: User[] = [];

export const userReducer = createReducer(
  initialState,
  on(setUsers, (_, { users }) => {
    localStorage.setItem('userState', JSON.stringify(users));
    return users;
  }),
  on(addUser, (state, { user }) => {
    const updated = [...state, user];
    localStorage.setItem('userState', JSON.stringify(updated));
    return updated;
  })
);
