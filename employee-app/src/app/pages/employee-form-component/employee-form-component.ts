import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-form-component.html',
  styleUrl: './employee-form-component.css'
})
export class EmployeeFormComponent {

  @Output() employeeAdded = new EventEmitter<any>();

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      department: ['', Validators.required],
      joiningDate: ['', Validators.required],
      hrLevel: [''],
      languages: [''],
      experience: [null],
      status: [true]
    });

    this.employeeForm.get('department')?.valueChanges.subscribe((department: string) => {
      this.setDepartmentSpecificValidators(department);
    });
  }

    setDepartmentSpecificValidators(department: string): void {
      const hrLevelControl = this.employeeForm.get('hrLevel');
      const languagesControl = this.employeeForm.get('languages');
      const experienceControl = this.employeeForm.get('experience');

      // Clear previous validators
      hrLevelControl?.clearValidators();
      languagesControl?.clearValidators();
      experienceControl?.clearValidators();

      // Apply new validators based on the department
      if (department === 'HR') {
        hrLevelControl?.setValidators(Validators.required);
      } else if (department === 'Engineering') {
        languagesControl?.setValidators(Validators.required);
      } else if (department === 'Marketing') {
        experienceControl?.setValidators(Validators.required);
      }

      // Re-evaluate validation status
      hrLevelControl?.updateValueAndValidity();
      languagesControl?.updateValueAndValidity();
      experienceControl?.updateValueAndValidity();
    }

    onSubmit() {
      if (this.employeeForm.valid) {
        this.employeeAdded.emit(this.employeeForm.value);
        this.employeeForm.reset(); // Reset the form to its initial state
      } else {
        this.employeeForm.markAllAsTouched();
      }
    }

}
