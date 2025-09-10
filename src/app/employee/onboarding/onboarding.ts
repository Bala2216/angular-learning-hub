import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-onboarding',
  imports: [CommonModule, FormsModule],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css'
})
export class Onboarding {
departments = ['HR', 'IT', 'Finance'];
  roles = ['Full-Time', 'Part-Time', 'Contractor'];
  submitted = false;

  employee = {
    personal: {
      name: '',
      email: '',
      gender: ''
    },
    department: '',
    terms: false,
    role: ''
  };

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      console.log('Submitted Employee:', this.employee);
      alert('Employee Onboarded Successfully!');
      form.resetForm(); // Reset form after submission
      this.submitted = false;
    }
  }
}
