import { Component } from '@angular/core';
import { AuthStore } from '../services/auth';
import { CommonModule } from '@angular/common';
import { FormRendererComponent } from "../form-renderer/form-renderer";
import { Onboarding } from "../employee/onboarding/onboarding";
import { Directives } from "../directives/directives";

@Component({
  selector: 'app-dashboard',
  imports: [ CommonModule, FormRendererComponent, Onboarding, Directives],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
constructor(private auth: AuthStore) {}

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
