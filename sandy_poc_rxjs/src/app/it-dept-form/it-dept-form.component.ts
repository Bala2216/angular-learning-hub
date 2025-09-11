import { Component } from '@angular/core';
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule, angularMaterialRenderers } from '@jsonforms/angular-material';
import * as validateUtil from '../validate.util';
import uischemaAsset from '../../assets/uischema.json';
import schemaAsset from '../../assets/schema.json';
import dataAsset from '../data';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { ColourCodePipe } from '../pipes/colour-code.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-it-dept-form',
  templateUrl: './it-dept-form.component.html',
  styleUrls: ['./it-dept-form.component.scss'],
  standalone: true,
  imports: [JsonFormsModule, JsonFormsAngularMaterialModule, ColourCodePipe, CommonModule]
})
export class ItDeptFormComponent {
  renderers = [
    ...angularMaterialRenderers
  ];
  uischema = uischemaAsset;
  schema = schemaAsset;
  data: any;
  submitted = false;
  validationMode: 'ValidateAndHide' | 'ValidateAndShow' = 'ValidateAndHide';

  constructor(private router: Router, private appService: AppService) {

  }

  ngOnInit() {
    this.data = { department: 'IT' };
    this.submitted = false;
  }

  onSubmit() {
    this.validationMode = 'ValidateAndShow';
    const isValid = validateUtil.validateData(this.schema, this.data);
    if (isValid) {
      this.submitted = true;

      this.appService.setCreated(this.data);
      this.router.navigate(['new-user'])
    } else {
      this.submitted = false;
    }
  }

  onDataChange(newData: any) {
    this.data = newData;
  }
}
