import { Component } from '@angular/core';
import { AuthStore } from '../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private auth: AuthStore, private router: Router) { }

  onRegister() {
    this.auth.register(this.user);
    this.router.navigate(['/login']);
  }
}
