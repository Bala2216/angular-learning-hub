import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAllEmployees } from '../store/employee.selectors';
import {
  loadEmployees,
  deleteEmployee,
  updateEmployee,
  addEmployee,
} from '../store/employee.actions';
import { Employee } from '../store/employee.model';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent {
  private store = inject(Store);
  selectedEmployee: Employee | null = null;
  showModal = false;
  private fb = inject(FormBuilder);
  isEditMode = false;

  constructor() {
    this.store.dispatch(loadEmployees());
  }
  employees$ = this.store.select(selectAllEmployees);

  form = this.fb.group({
    id: [0],
    name: [''],
    role: [''],
    email: [''],
  });

  edit(emp: Employee) {
    this.form.patchValue(emp);
    this.selectedEmployee = { ...emp };
    this.showModal = true;
    this.isEditMode = true;
  }

  delete(id: number | undefined) {
    if (id !== undefined && id !== 0) {
      this.store.dispatch(deleteEmployee({ id }));
    } else {
      console.warn('Invalid ID for deletion:', id);
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedEmployee = null;
    this.form.reset();
    this.isEditMode = false;
  }

  submit() {
    const formValue = this.form.value;
    const employee: Employee = {
      id: formValue['id'] ?? 0,
      name: formValue['name'] ?? '',
      role: formValue['role'] ?? '',
      email: formValue['email'] ?? '',
    };

    if (this.isEditMode && employee.id !== null && employee.id !== undefined) {
      this.store.dispatch(updateEmployee({ employee: employee }));
      this.showModal = false;
    } else {
      const { name, role, email } = employee;
      this.store.dispatch(addEmployee({ employee: { name, role, email } }));
      this.showModal = false;
    }

    this.form.reset();
    this.isEditMode = false;
  }

  openAddModal() {
    this.form.reset();
    this.isEditMode = false;
    this.showModal = true;
  }

  showDeleteModal = false;

  confirmDelete(emp: Employee) {
    this.selectedEmployee = emp;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.selectedEmployee = null;
    this.showDeleteModal = false;
  }

  deleteConfirmed() {
    if (this.selectedEmployee?.id) {
      this.store.dispatch(deleteEmployee({ id: this.selectedEmployee.id }));
    }
    this.cancelDelete();
  }
}
