import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserData } from '../modal/UserData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
  submitted = false;
  @Output() formSubmitted = new EventEmitter<UserData>();
  @ViewChild('userForm') userForm!: NgForm;

  onSubmit() {
    this.submitted = true;
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
    this.submitted = false;
 }
}
