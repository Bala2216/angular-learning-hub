import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersApi = 'https://jsonplaceholder.typicode.com/users';
  private commentsApi = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) {}

  getUsers(searchText: string = ''): Observable<User[]> {
    const users$ = this.http.get<any[]>(searchText ? `${this.usersApi}?name_like=${searchText}` : this.usersApi);
    const comments$ = this.http.get<any[]>(this.commentsApi);

    return forkJoin([users$, comments$]).pipe(
      map(([users, comments]) => {
        return users.map(user => {
          const comment = comments.find(c => c.id === user.id);
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            body: comment?.body || 'No comment available'
          };
        });
      })
    );
  }

  addUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.usersApi, user);
  }
}
