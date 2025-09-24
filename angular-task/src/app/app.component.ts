import { Component, inject } from '@angular/core';
import { TemplateFormComponent } from "./template-form/template-form.component";
import { DataTableComponent } from "./data-table/data-table.component";
import { UserData } from './modal/UserData';
import { ReactiveFormComponent } from "./reactive-form/reactive-form.component";
import { JsonFormComponent } from './json-form/json-form.component';
import { EmployeeService } from './work-force-managment/services/employee.service';
import { Employee } from './work-force-managment/models/employee.model';
import { SearchBar } from './work-force-managment/components/search-bar/search-bar';
import { EmployeeCard } from './work-force-managment/components/employee-card/employee-card';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './work-force-managment/pipes/filter.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TemplateFormComponent,
    DataTableComponent,
    ReactiveFormComponent,
    JsonFormComponent,
    SearchBar,
    EmployeeCard,
    CommonModule,
    FilterPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  submittedData: UserData[] = [];
  latestUserData: UserData | null = null;
  
  employees: Employee[] = [];
  searchText = '';
  private employeeService = inject(EmployeeService);

  onFormSubmitted(data: UserData) {
    this.submittedData = [...this.submittedData, data];
    this.latestUserData = { ...data };
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data.map((user) => ({
        id: user.id,
        name: user.name,
        city: user.address?.city ?? 'Unknown',
        email: user.email,
        avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.id)
      }));
    });
  }
}
