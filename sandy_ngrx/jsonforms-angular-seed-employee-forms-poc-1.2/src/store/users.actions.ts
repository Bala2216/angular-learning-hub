import { createAction, props } from '@ngrx/store';
import { Employee } from '../app/app.service';

// User actions
export const loadUsers = createAction(
  '[Users] Load Users',
  props<{ searchTerm: string }>()
);

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: Employee[]; searchTerm: string }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>()
);
// Posts actions
export const loadUserPosts = createAction(
  '[Users] Load User Posts',
  props<{ users: Employee[] }>()
);

export const loadUserPostsSuccess = createAction(
  '[Users] Load User Posts Success',
  props<{ posts: any[]; userPostsMap: { [userId: number]: any[] } }>()
);

export const loadUserPostsFailure = createAction(
  '[Users] Load User Posts Failure',
  props<{ error: string }>()
);

export const clearUsersData = createAction('[Users] Clear Users Data');
