import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EmployeeService } from '../employee-component/employee-service';

@Component({
  selector: 'app-dashboard-component',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css'
})
export class DashboardComponent implements OnInit {

  employeeCount : number = 0;

  private employeeService = inject(EmployeeService);

  ngOnInit(): void {
   this.employeeCount =  this.employeeService.getEmployeeList().length;
  }

}
