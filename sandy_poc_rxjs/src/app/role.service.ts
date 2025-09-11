import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private roleSubject = new BehaviorSubject<string | null>(this.getRoleFromStorage());
  role$ = this.roleSubject.asObservable();

  setRole(role: string) {
    this.roleSubject.next(role);
    localStorage.setItem('userRole', role);
  }
  getRoleFromStorage(): string | null {
    return localStorage.getItem('userRole');
  }
}
