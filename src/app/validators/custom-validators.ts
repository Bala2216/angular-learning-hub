import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  };
}

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile starts with 6-9, total 10 digits
    return phoneRegex.test(control.value) ? null : { invalidPhone: true };
  };
}
