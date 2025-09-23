import { Component } from '@angular/core';
import { TemplateFormComponent } from "./template-form/template-form.component";
import { DataTableComponent } from "./data-table/data-table.component";
import { UserData } from './modal/UserData';
import { ReactiveFormComponent } from "./reactive-form/reactive-form.component";
import { JsonFormComponent } from './json-form/json-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TemplateFormComponent,
    DataTableComponent,
    ReactiveFormComponent,
    JsonFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  submittedData: UserData[] = [];
  latestUserData: UserData | null = null;

  onFormSubmitted(data: UserData) {
    this.submittedData = [...this.submittedData, data];
    this.latestUserData = { ...data}
  }
}
