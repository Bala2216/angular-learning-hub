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
import { forkJoin, pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
const EMPLOYEE_DATA: EmployeeData[] = [];
@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, OverviewColorDirective],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnChanges, OnInit  {
  @Input() message: string = '';
  displayedColumns: string[] = ['name', 'email', 'department', 'role', 'employmentType', 'gender'];
  dataSource = EMPLOYEE_DATA;
  data = EMPLOYEE_DATA;
  @ViewChild(MatTable) table!: MatTable<any>;
  constructor(private cdr: ChangeDetectorRef, private employeeService: EmployeeService, private router: Router, private subscriptionService: SubscriptionService) {
    
    // this.subscriptionService.subscriptions$.subscribe(employees => {
    //   this.dataSource = employees; 
    //   console.log('Fetched dataSource:', employees);

    // });
    this.subscriptionService.subscriptionsSearchStr$.pipe(
      debounceTime(300), // Adjust the debounce time as needed
      distinctUntilChanged()
    ).subscribe(filterString => {
      if (filterString === '') {
        this.fetchOnPageLoad();
      } else {
        this.fetchOnPageLoad(filterString);
      }
      this.table.renderRows();
      console.log('Filter string:', filterString);
      console.log('Filtered dataSource:', this.dataSource);
    });

    // this.subscriptionService.subscriptionsSearchStr$.subscribe(filterString => {
      
    //   if (filterString === '') {
    //     this.dataSource = this.data;
    //   } else {
    //     this.dataSource = this.data.filter(emp => emp.name.toLowerCase().includes(filterString.toLowerCase()));
    //     //this.filterData(filterString);
    //   }
    //   this.table.renderRows();
    //   console.log('Filter string:', filterString);
    //   console.log('Filtered dataSource:', this.dataSource);
      
    // });

    this.subscriptionService.subscriptionsGenderSelection$.subscribe(selectedRole => {
      
      if (selectedRole === '') {
        this.dataSource = this.data;
      } else {
        
        this.dataSource = this.data.filter(emp => {
          const userRole = emp.role ? emp.role.toLowerCase() : 'admin-read'; // Default role if undefined
          return userRole === selectedRole.toLowerCase()
        });
      }
      this.table.renderRows();
      console.log('Filter string:', selectedRole);
      console.log('Filtered dataSource:', this.dataSource);
      
    });
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
    // Fetch employees and roles simultaneously
    this.fetchOnPageLoad();
    

    // this.employeeService.getEmployees().subscribe((employees) => {
    //   //this.subscriptionService.setEmployees(employees);
    //   employees.forEach(emp => this.subscriptionService.add(emp));
    //   this.dataSource = employees;
    //   this.data = employees;
    //   this.cdr.detectChanges();
    //   console.log('Fetched employees:', this.dataSource);
    // });
  }


  fetchOnPageLoad(filterString = '') {
    const employees$ = this.employeeService.getEmployees(filterString);
    const roles$ = this.employeeService.getRoles();

    forkJoin({ employees: employees$, roles: roles$ }).subscribe({
      next: (data) => {
        //this.combinedData = data;
        console.log('Combined Data:', data);
        const dataSet = data.employees.map(emp => {
          let role = '';
          if (emp.department.toLowerCase() === 'it') {
            role = data.roles.it;
          } else if (emp.department.toLowerCase() === 'accounts') {
            role = data.roles.accounts;
          } else if (emp.department.toLowerCase() === 'management') {
            role = data.roles.management;
          } else {
            role = 'admin-read';
          }
          return { ...emp, role };
        });
        console.log('Data Set with Roles:', dataSet);
        //this.subscriptionService.setEmployees(data.employees);
        dataSet.forEach(emp => this.subscriptionService.add(emp));
        this.dataSource = dataSet;
        this.data = dataSet;
        this.cdr.detectChanges();
        console.log('Fetched employees:', dataSet);
      },
      error: (error) => console.error('Error fetching data:', error),
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
