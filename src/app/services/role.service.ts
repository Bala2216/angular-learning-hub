import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private initialRole = localStorage.getItem('selectedRole') || '';

  private roleSignal = signal<string>(this.initialRole);
  private roleSubject = new BehaviorSubject<string>(this.initialRole);

  setRole(role: string) {
    localStorage.setItem('selectedRole', role);
    this.roleSignal.set(role);
    this.roleSubject.next(role);
  }

  get role$() {
    return this.roleSubject.asObservable();
  }

  get roleSignalValue() {
    return this.roleSignal();
  }
}

