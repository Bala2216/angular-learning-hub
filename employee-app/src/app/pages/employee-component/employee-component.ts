import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { EmployeeService } from './employee-service';
import { EmployeeListComponent } from "../employee-list-component/employee-list-component";
import { EmployeeFormComponent } from "../employee-form-component/employee-form-component";

@Component({
  selector: 'app-employee-component',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, EmployeeListComponent, EmployeeFormComponent],
  templateUrl: './employee-component.html',
  styleUrl: './employee-component.css'
})

export class EmployeeComponent implements OnInit{
  showForm = false;

  private employeeService = inject(EmployeeService);

  employeeList: any [] = [];

  ngOnInit(): void {
    this.employeeList =  this.employeeService.getEmployeeList();
  }

  toggleView() {
    this.showForm = !this.showForm;
  }

  handleAddEmployee(newEmployee: any) {
    this.employeeService.addEmployee(newEmployee);
    this.employeeList = this.employeeService.getEmployeeList();
    this.showForm = false;
  }


  handleDelete(index: number) {
    this.employeeService.deleteEmployee(index);
    this.employeeList = this.employeeService.getEmployeeList();
  }
}
