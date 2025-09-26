import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersFailure, loadUserPosts, loadUserPostsSuccess, loadUserPostsFailure, clearUsersData } from './users.actions';
import { Employee } from '../app/app.service';



export interface UsersState {
  users: Employee[];
  posts: any[];
  userPostsMap: { [key: string]: any };
  loading: boolean;
  loadingPosts: boolean;
  error: any;
  lastSearchTerm: string;
}

export const initialUsersState: UsersState = {
  users: [],
  posts: [],
  userPostsMap: {},
  loading: false,
  loadingPosts: false,
  error: null,
  lastSearchTerm: ''
};

export const usersReducer = createReducer(
  initialUsersState,

  on(loadUsers, (state, { searchTerm }) => ({
    ...state,
    loading: true,
    error: null,
    lastSearchTerm: searchTerm
  })),

  on(loadUsersSuccess, (state, { users, searchTerm }) => ({
    ...state,
    users: users,
    loading: false,
    error: null,
    lastSearchTerm: searchTerm,
    // Clear posts when new users are loaded
    posts: [],
    userPostsMap: {}
  })),

  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    users: [],
    loading: false,
    error: error,
    posts: [],
    userPostsMap: {}
  })),

  on(loadUserPosts, (state) => ({
    ...state,
    loadingPosts: true
  })),

  on(loadUserPostsSuccess, (state, { posts, userPostsMap }) => ({
    ...state,
    posts: posts,
    userPostsMap: userPostsMap,
    loadingPosts: false
  })),

  on(loadUserPostsFailure, (state, { error }) => ({
    ...state,
    loadingPosts: false,
    error: error
  })),

  on(clearUsersData, (state) => ({
    ...state,
    users: [],
    posts: [],
    userPostsMap: {},
    loading: false,
    loadingPosts: false,
    error: null,
    lastSearchTerm: ''
  }))
);
