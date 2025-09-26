import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectUsersState = createFeatureSelector<any>('users');

export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

export const selectPosts = createSelector(
  selectUsersState,
  (state) => state.posts
);

export const selectUserPostsMap = createSelector(
  selectUsersState,
  (state) => state.userPostsMap
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.loading
);

export const selectPostsLoading = createSelector(
  selectUsersState,
  (state) => state.loadingPosts
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state) => state.error
);

export const selectLastSearchTerm = createSelector(
  selectUsersState,
  (state) => state.lastSearchTerm
);

// Combined selector for loading state
export const selectAnyLoading = createSelector(
  selectUsersLoading,
  selectPostsLoading,
  (usersLoading, postsLoading) => usersLoading || postsLoading
);
