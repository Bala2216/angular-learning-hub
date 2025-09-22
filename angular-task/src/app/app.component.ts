import { Component } from '@angular/core';
import { TemplateFormComponent } from "./template-form/template-form.component";
import { DataTableComponent } from "./data-table/data-table.component";
import { UserData } from './modal/UserData';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TemplateFormComponent, DataTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  submittedData: UserData[] = [];

  onFormSubmitted(data: UserData) {
    this.submittedData = [...this.submittedData, data];
  }
}
