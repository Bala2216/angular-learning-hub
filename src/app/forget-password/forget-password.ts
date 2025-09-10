import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { delay, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, FormsModule, BrowserModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css'
})
export class ForgetPassword {
forgotPasswordForm!: FormGroup;
  loading = false;
  passwordStrengthChecker!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      credentials: this.fb.group({
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      }, { validators: this.passwordMatchValidator }),
      securityQuestions: this.fb.array([
        this.createSecurityQuestion()
      ])
    });

    // Async validator added to new password
    this.forgotPasswordForm.get('credentials.newPassword')?.addAsyncValidators(this.passwordNotUsedBeforeAsync());
  }

  // Custom Validator: Match password and confirm
  passwordMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  // Async Validator: Simulate server-side validation
  passwordNotUsedBeforeAsync(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: boolean } | null> => {
      const usedPasswords = ['123456', 'password', 'qwerty'];
      return of(usedPasswords.includes(control.value)).pipe(
        delay(1000),
        map(isUsed => (isUsed ? { usedBefore: true } : null))
      );
    };
  }

  // FormArray: Add more security questions
  get securityQuestions(): FormArray {
    return this.forgotPasswordForm.get('securityQuestions') as FormArray;
  }

  createSecurityQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }

  addSecurityQuestion() {
    this.securityQuestions.push(this.createSecurityQuestion());
  }

  removeSecurityQuestion(index: number) {
    this.securityQuestions.removeAt(index);
  }

  onSubmit() {
    this.loading = true;

    if (this.forgotPasswordForm.valid) {
      setTimeout(() => {
        console.log('Form Submitted:', this.forgotPasswordForm.value);
        this.loading = false;
      }, 2000);
    } else {
      this.forgotPasswordForm.markAllAsTouched();
      this.loading = false;
    }
  }

  getControl(path: string) {
    return this.forgotPasswordForm.get(path);
  }
}
