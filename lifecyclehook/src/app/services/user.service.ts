import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { User, UserComment } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = 'https://jsonplaceholder.typicode.com/users';
  private apiCommentsURL = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL);
  }

  searchUsers(query: string): Observable<User[]> {
    const url = `${this.apiURL}?q=${query}`;
    return this.http.get<User[]>(url);
  }

  getUsersWithComments(): Observable<any[]> {
    return forkJoin({
      users: this.http.get<User[]>(this.apiURL),
      comments: this.http.get<UserComment[]>(this.apiCommentsURL),
    }).pipe(
      map(({ users, comments }) => {
        return users.map((user) => {
          return {
            ...user,
            comments: comments.filter((comment) => comment.postId === user.id),
          };
        });
      })
    );
  }
}
