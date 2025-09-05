import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard-component/dashboard-component";
import { EmployeeComponent } from "../employee-component/employee-component";
import { RouterOutlet, RouterLink } from '@angular/router';


@Component({
  selector: 'app-layout-component',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.css'
})
export class LayoutComponent {

}
