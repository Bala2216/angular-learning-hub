import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'hr-dept-form',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './hr-dept-form.component.html',
  styleUrls: ['./hr-dept-form.component.scss']
})
export class HrDeptFormComponent implements OnInit {
  employeeForm!: FormGroup;
  submitted = false;
  success = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      department: ['HR'],
      skills: ['']
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.employeeForm.valid) {
      this.success = true;
    } else {
      this.success = false;
    }
  }

  onCancel(): void {
    this.router.navigate(['']);
  }
}
