import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  errorMessage = '';
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }
    const { username, password } = this.form.value;
    this.auth.login(username, password).subscribe({
      next: (user) => {
         if (this.auth.getRole() === 'admin') {
          this.router.navigateByUrl('/claims');
         } else {
           this.router.navigateByUrl('/submit');
         }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid username or password';
      },
    });
  }

  register(){
    this.router.navigateByUrl('/register');
  }
}
