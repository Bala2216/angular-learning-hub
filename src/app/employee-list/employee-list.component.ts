import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeData} from '../employee';
import {MatTableModule} from '@angular/material/table';
import { SubscriptionService } from '../subscription-service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../employee.service';
import { MatTable } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { OverviewColorDirective } from '../overview-color.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
const EMPLOYEE_DATA: EmployeeData[] = [];
@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, OverviewColorDirective],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnChanges, OnInit  {
  @Input() message: string = '';
  displayedColumns: string[] = ['name', 'email', 'department', 'employmentType', 'gender'];
  dataSource = EMPLOYEE_DATA;
  data = EMPLOYEE_DATA;
  @ViewChild(MatTable) table!: MatTable<any>;
  constructor(private cdr: ChangeDetectorRef, private employeeService: EmployeeService, private router: Router, private subscriptionService: SubscriptionService) {
    
    // this.subscriptionService.subscriptions$.subscribe(employees => {
    //   this.dataSource = employees; 
    //   console.log('Fetched dataSource:', employees);

    // });
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      
      if (filterValue === '') {
        this.dataSource = this.data;
      } else {
        this.dataSource = this.data.filter(emp => emp.name.toLowerCase().includes(filterValue.toLowerCase()));
      }
      this.table.renderRows();
    
    }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      //this.subscriptionService.setEmployees(employees);
      employees.forEach(emp => this.subscriptionService.add(emp));
      this.dataSource = employees;
      this.data = employees;
      this.cdr.detectChanges();
      console.log('Fetched employees:', this.dataSource);
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      console.log('ngOnChanges: message changed from', changes['message'].previousValue, 'to', changes['message'].currentValue);
    }
  }

  

  toenroll(){
    this.router.navigate(['/employee-onboard']);
  }

  toDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
