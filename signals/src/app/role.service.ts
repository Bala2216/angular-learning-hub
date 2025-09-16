import { effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoleService {

  currentRole = signal<string>(localStorage.getItem('userRole') || '');

  constructor() {
    effect(() => {
      const role = this.currentRole();
      if (role) {
        localStorage.setItem('userRole', role);
      }
    });
  }
  setRole(role: string) {
    this.currentRole.set(role);
  }
}
