import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {

  loginObj: any = {
    "userName": "",
    "password": ""
  }

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
    this.router.navigateByUrl('dashboard');
  }
}
