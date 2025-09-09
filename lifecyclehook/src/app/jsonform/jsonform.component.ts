import { Component } from '@angular/core';
import { JsonFormsModule } from '@jsonforms/angular';
import { angularMaterialRenderers } from '@jsonforms/angular-material';

@Component({
  selector: 'app-jsonform',
  imports: [JsonFormsModule],
  templateUrl: './jsonform.component.html',
  styleUrl: './jsonform.component.scss',
})
export class JsonformComponent {
  renderers = angularMaterialRenderers;

  data = {
    name: '',
    phone: '',
    age: '',
    date: '',
    status: 'active',
  };

  schema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      phone: { type: 'string', pattern: '^[0-9]{10}$' },
      age: { type: 'number', minimum: 0, maximum: 100 },
      date: { type: 'string', format: 'date' },
      status: { type: 'string', enum: ['active', 'inactive'] },
    },
    required: ['name', 'phone', 'age', 'date', 'status'],
  };

  uischema = {
    type: 'VerticalLayout',
    elements: [
      { type: 'Control', scope: '#/properties/name' },
      { type: 'Control', scope: '#/properties/phone' },
      { type: 'Control', scope: '#/properties/age' },
      { type: 'Control', scope: '#/properties/date' },
      { type: 'Control', scope: '#/properties/status' },
    ],
  };
}
