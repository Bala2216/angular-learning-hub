import { Component } from '@angular/core';
import { AuthStore } from '../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';

  constructor(private auth: AuthStore, private router: Router) {}
  

  onLogin() {
    if (this.auth.login(this.email, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid email or password.');
    }
  }
}
