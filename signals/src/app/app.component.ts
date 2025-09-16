import { Component, OnInit } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { and, schemaTypeIs, scopeEndsWith, Tester } from '@jsonforms/core';
import uischemaAsset from '../assets/uischema.json';
import schemaAsset from '../assets/schema.json';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  renderers = [
    ...angularMaterialRenderers];
  uischema = uischemaAsset;
  schema = schemaAsset;
  data: any;
  submitted = false;

  constructor(dateAdapter: DateAdapter<Date>) {

  }

  ngOnInit() {
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;
  }
}
