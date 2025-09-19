import { User } from './model';
import { createReducer, on } from '@ngrx/store';
import { loadUser, loadUserSuccess } from './action';

export interface UserState {
  users: User[],
  loading: boolean,
}

export const initialState: UserState = {
  users: [],
  loading: false
}


export const userReducer = createReducer(
  initialState,
 on(loadUser, (state: any) => ({
    ...state,
    loading: true
})),
 on(loadUserSuccess, (state: any , {users}: any) => ({
    ...state,
    users: users,
    loading: false
 }))
)
