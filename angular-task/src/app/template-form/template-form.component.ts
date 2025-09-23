import { Component, EventEmitter, Output, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserData } from '../modal/UserData';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.scss',
})
export class TemplateFormComponent {
  userData: UserData = {
    name: '',
    gender: '',
    age: '',
    phoneNumber: '',
  };
  submitted = signal(false);
  @Output() formSubmitted = new EventEmitter<UserData>();
  @ViewChild('userForm') userForm!: NgForm;

  onSubmit() {
    this.submitted.set(true);
    if (
      this.userData.name &&
      this.userData.age &&
      this.userData.gender &&
      this.userData.phoneNumber
    ) {
      this.formSubmitted.emit({ ...this.userData });
      this.resetForm();
    }
  }

  resetForm(){
    this.userForm.resetForm();
      this.userData = {
      name: '',
      gender: '',
      age: '',
      phoneNumber: '',
    };
    this.submitted.set(false);
 }
}
