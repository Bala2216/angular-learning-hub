import {ChangeDetectionStrategy, Component, OnInit, DoCheck, OnDestroy   } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../subscription-service';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { BehaviorSubject } from 'rxjs';
import { Subscription, interval } from 'rxjs';
import { StaffListComponent } from '../staff-list/staff-list.component';


@Component({
  selector: 'app-dashboard',
  imports: [MatToolbarModule, CommonModule, RouterModule,
    MatButtonModule, EmployeeListComponent, 
    MatIconModule, MatCardModule, MatButtonModule, StaffListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, DoCheck, OnDestroy   {
  employeesCount: number = 0;
  subscription: Subscription
  constructor(private subscriptionService: SubscriptionService) {
    this.subscription = this.subscriptionService.subscriptions$.subscribe(employees => {
      this.employeesCount = employees.length; 
    });

    
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy: CleanupComponent destroyed.');
    this.subscription.unsubscribe(); // Unsubscribe to prevent memory leak
  }

  ngOnInit(): void {
    console.log('ngOnInit: ParentComponent initialized.');
    // Perform data fetching or other initialization tasks here
  }

  ngDoCheck(): void {
    console.log('ngDoCheck: Custom change detection check.');
    // Implement custom change detection logic here
  }
  ngAfterContentInit(): void {
    console.log('4. ngAfterContentInit called')
  }

  ngAfterContentChecked(): void {
    console.log('5. ngAfterContentChecked called')
  }

  ngAfterViewInit(): void {
    console.log('6. ngAfterViewInit called')
  }

  ngAfterViewChecked(): void {
    console.log('7. ngAfterViewChecked called')
  }
}
