import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  register(user: {
    username: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            const user = users[0];
            localStorage.setItem('token', JSON.stringify(user));
            localStorage.setItem('role', user.role);
            return user;
          } else {
            throw new Error('Invalid credentials or Please register new account');
          }
        }),
        catchError((err) => throwError(() => err))
      );
  }

  logout(): void {
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getCurrentUser(): any {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }
}
