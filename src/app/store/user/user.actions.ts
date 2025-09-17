import { createAction, props } from '@ngrx/store';
import { User } from '../../services/user.service';

export const loadUsers = createAction('[User] Load Users', props<{ searchText: string }>());
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[] }>());
export const addUser = createAction('[User] Add User', props<{ user: User }>());
