import { Injectable } from '@angular/core';
import { EmployeeType } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeList : any = [];

  constructor() {
    const employees = localStorage.getItem('employees');

    if(employees) {
      this.employeeList = JSON.parse(employees);
    }
  }

  getEmployeeList() {
    return this.employeeList;
  }

  addEmployee(employee: EmployeeType) {
    this.employeeList.push({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      joiningDate: employee.joiningDate,
      hrLevel: employee.hrLevel,
      languages: employee.languages,
      experience: employee.experience
    });
    this.saveEmployees();
  }

  deleteEmployee(index: number) {
    this.employeeList.splice(index, 1);
    this.employeeList = [...this.employeeList];
    this.saveEmployees();
  }

  private saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(this.employeeList))
  }

}
