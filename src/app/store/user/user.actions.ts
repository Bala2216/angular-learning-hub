import { createAction, props } from '@ngrx/store';
import { User } from '../../services/user.service';

export const addUser = createAction('[User] Add User', props<{ user: User }>());
export const loadUsers = createAction('[User] Load Users');
export const setUsers = createAction('[User] Set Users', props<{ users: User[] }>());
