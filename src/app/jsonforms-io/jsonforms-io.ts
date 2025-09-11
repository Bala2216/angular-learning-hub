import { Component } from '@angular/core';
import { JsonFormsModule } from '@jsonforms/angular';
import { angularMaterialRenderers, JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { jsonSchema, uiSchema } from '../forms-schema/form1-json-schema';

@Component({
  selector: 'app-jsonforms-io',
  imports: [JsonFormsModule, JsonFormsAngularMaterialModule],
  templateUrl: './jsonforms-io.html',
  styleUrl: './jsonforms-io.css'
})
export class JsonformsIo {
  renderers = angularMaterialRenderers;
  data = {};
  schema = jsonSchema
  uischema = uiSchema;

  onSubmit() {
    console.log('Form Data:', this.data);
    alert('Form submitted! Check console for data.');
  }

}
