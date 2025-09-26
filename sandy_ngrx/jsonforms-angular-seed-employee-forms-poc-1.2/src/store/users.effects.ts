import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of, forkJoin } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Employee } from '../app/app.service';
import { loadUserPosts, loadUserPostsFailure, loadUserPostsSuccess, loadUsers, loadUsersFailure, loadUsersSuccess } from './users.actions';

@Injectable()
export class UsersEffects {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {
    // Initialize effects in constructor to ensure dependencies are injected
    this.initEffects();
  }

  loadUsers$: any;
  loadPostsAfterUsers$: any;
  loadUserPosts$: any;

  private initEffects() {
    this.loadUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadUsers),
        switchMap(action => {
          // Fetch all users since JSONPlaceholder doesn't support name_like
          return this.http.get<Employee[]>(`${this.apiUrl}/users`)
            .pipe(
              map(users => {
                // Filter users based on search term
                let filteredUsers = users;
                if (action.searchTerm.trim() && action.searchTerm !== 'all') {
                  filteredUsers = users.filter(user =>
                    user.name.toLowerCase().includes(action.searchTerm.toLowerCase())
                  );
                }

                // Add gender logic
                const processedUsers: Employee[] = filteredUsers.map(user => {
                  const employeeWithGender: Employee = { ...user };
                  const nameLength = user.name.length;
                  employeeWithGender.gender = (nameLength % 2 === 0) ? 'Female' : 'Male';
                  return employeeWithGender;
                });
                return loadUsersSuccess({ users: processedUsers, searchTerm: action.searchTerm });
              }),
              catchError(error => of(loadUsersFailure({ error: error.message })))
            );
        })
      )
    );

    // Auto-load posts when users are successfully loaded
    this.loadPostsAfterUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadUsersSuccess),
        switchMap(action => {
          if (action.users.length === 0) {
            return of(loadUserPostsSuccess({ posts: [], userPostsMap: {} }));
          }
          return of(loadUserPosts({ users: action.users }));
        })
      )
    );

    this.loadUserPosts$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadUserPosts),
        switchMap(action => {
          if (action.users.length === 0) {
            return of(loadUserPostsSuccess({ posts: [], userPostsMap: {} }));
          }

          const postRequests = action.users.map(user =>
            this.http.get<any[]>(`${this.apiUrl}/posts?userId=${user.id}`)
          );

          return forkJoin(postRequests).pipe(
            map(postsArrays => {
              const allPosts = postsArrays.flat();
              const userPostsMap: { [userId: number]: any[] } = {};

              action.users.forEach((user, idx) => {
                userPostsMap[user.id] = postsArrays[idx];
              });

              return loadUserPostsSuccess({ posts: allPosts, userPostsMap });
            }),
            catchError(error => of(loadUserPostsFailure({ error: error.message })))
          );
        })
      )
    );
  }
}
