import {Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeData} from '../employee';
import {MatTableModule} from '@angular/material/table';
import { SubscriptionService } from '../subscription-service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


const EMPLOYEE_DATA: EmployeeData[] = [];
@Component({
  selector: 'app-employee-list',
  imports: [MatTableModule, CommonModule, MatButtonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnChanges {
  @Input() message: string = '';
  constructor(private router: Router, private subscriptionService: SubscriptionService) {
    
    this.subscriptionService.subscriptions$.subscribe(employees => {
      this.dataSource = employees; 
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      console.log('ngOnChanges: message changed from', changes['message'].previousValue, 'to', changes['message'].currentValue);
    }
  }

  displayedColumns: string[] = ['name', 'email', 'department', 'employmentType'];
  dataSource = EMPLOYEE_DATA;

  toenroll(){
    this.router.navigate(['/employee-onboard']);
  }

  toDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
