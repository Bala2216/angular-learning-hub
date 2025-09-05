import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './employee-service';
import { EmployeeListComponent } from "../employee-list-component/employee-list-component";

@Component({
  selector: 'app-employee-component',
  imports: [FormsModule, CommonModule, EmployeeListComponent],
  templateUrl: './employee-component.html',
  styleUrl: './employee-component.css'
})

export class EmployeeComponent implements OnInit{
  showForm = false;
  employee = {
    name: '',
    email: '',
    phone: '',
    department: '',
    joiningDate: '',
    hrLevel: '',
    languages: '',
    experience: null
  };

  private employeeService = inject(EmployeeService);

  employeeList: any [] = [];

  ngOnInit(): void {
    this.employeeList =  this.employeeService.getEmployeeList();
   }

 // employeeList: any = this.employeeService.getEmployeeList();

  toggleView() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    this.employeeService.addEmployee(this.employee)

    this.employee = {
      name: '',
      email: '',
      phone: '',
      department: '',
      joiningDate: '',
      hrLevel: '',
      languages: '',
      experience: null
    }

    this.showForm = false;
  }

  handleDelete(index: number) {
    this.employeeService.deleteEmployee(index);
    this.employeeList = this.employeeService.getEmployeeList();
  }
}
