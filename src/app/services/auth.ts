import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private userKey = 'user';

  register(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  login(email: string, password: string): boolean {
    const stored = localStorage.getItem(this.userKey);
    if (!stored) return false;
    const user = JSON.parse(stored);
    return user.email === email && user.password === password;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.userKey);
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
  }

  getUser(): any {
    const stored = localStorage.getItem(this.userKey);
    return stored ? JSON.parse(stored) : null;
  }
}
