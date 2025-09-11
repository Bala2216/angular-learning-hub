import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, MatToolbarModule, MatButtonModule, MatIconModule]
})
export class DashboardComponent {
  constructor(private router: Router) {}

  cards = [
    { title: 'IT Dept employee Registration (json form)', icon: 'bi-motherboard', route: '/it-dept-form' },
    { title: 'Finance Dept employee Registration (template-driven)', icon: 'bi-person-lines-fill', route: '/finance-dept-form' },
    { title: 'HR Dept employee Registration (reactive)', icon: 'bi-list-ul', route: '/hr-dept-form' },
    // { title: 'View Newly Registered Employees', icon: 'bi-people-fill', route: '/view-newly-registered-employees'},
    { title: 'View All Employees (GET API)', icon: 'bi-people', route: '/view-all-employees' },
    { title: 'Roles', icon: 'bi-gear-fill', route: '/roles' }
  ];

  formNavigation(department: string) {
      this.router.navigate([department]);
  }
}
