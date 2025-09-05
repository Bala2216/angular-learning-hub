import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { EmpDetailsComponent } from '../emp-details/emp-details.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [FormsModule, EmpDetailsComponent, NgIf],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.css'
})
export class UserformComponent {
  myForm: FormGroup | any;
  isUserFormVisible = true
  empDetails = {
    EmpName: '',
    EmpDept: '',
    EmpSalary: '',
  }

  ngOnInit() {
    this.empDetails = { EmpName: 'Raj', EmpDept: 'Marketing', EmpSalary: '20000' }
  }

  updateDetails(val: NgForm) {
    console.log(val)
    this.myForm = val
    this.empDetails.EmpName = this.myForm.name
    this.empDetails.EmpDept = this.myForm.dept
    this.empDetails.EmpSalary = this.myForm.salary
    console.log(this.empDetails)
  }
  hideEmpDetails() {
    this.isUserFormVisible = !this.isUserFormVisible
  }



}
