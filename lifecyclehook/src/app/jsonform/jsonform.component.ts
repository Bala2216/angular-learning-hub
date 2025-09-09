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
  uischema = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        label: false,
        scope: '#/properties/done',
      },
      {
        type: 'Control',
        scope: '#/properties/name',
      },
      {
        type: 'HorizontalLayout',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/due_date',
          },
          {
            type: 'Control',
            scope: '#/properties/recurrence',
          },
        ],
      },
    ],
  };
  schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
      done: {
        type: 'boolean',
      },
      due_date: {
        type: 'string',
        format: 'date',
      },
      recurrence: {
        type: 'string',
        enum: ['Never', 'Daily', 'Weekly', 'Monthly'],
      },
    },
    required: ['name', 'due_date'],
  };
  data = {};
}
