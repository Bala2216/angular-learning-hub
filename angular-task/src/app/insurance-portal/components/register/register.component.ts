// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['user', Validators.required],
    });
  }

  register(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }
    this.auth.register(this.form.value).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  login() {
    this.router.navigateByUrl('/login');
  }
}
