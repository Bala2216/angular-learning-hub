import { Component } from '@angular/core';
import { JsonFormsModule } from '@jsonforms/angular';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { CommonModule } from '@angular/common';
import { UserlistComponent } from '../userlist/userlist.component';

@Component({
  selector: 'app-jsonform',
  imports: [JsonFormsModule, CommonModule, UserlistComponent],
  templateUrl: './jsonform.component.html',
  styleUrl: './jsonform.component.scss',
})
export class JsonformComponent {
  renderers = angularMaterialRenderers;

  // Initialize data with empty values to avoid validation errors on load
  data: any = {
    name: '',
    phone: '',
    age: '',
    date: '',
    status: 'active',
  };

  users: any[] = [];
  isFormValid = false;

  schema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      phone: { type: 'string', pattern: '^[0-9]{10}$' },
      age: {
        type: 'string',
        pattern: '^[0-9]{1,3}$',
        minimum: 0,
        maximum: 100,
      },
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

  onDataChange(event: any) {
    // this.data = event.data;
    this.data = event;
    console.log('Form data changed:', event);
    // Update validity based on the errors array from the event
    // this.isFormValid = event?.errors?.length === 0;
    // isFormValid true data is having values
    this.isFormValid = Object.values(this.data).every((x) => x);
  }

  onSubmit() {
    if (this.isFormValid) {
      this.users.push({ ...this.data });

      // Reset the form data after submission
      this.data = {
        name: '',
        phone: '',
        age: '',
        date: '',
        status: 'active',
      };
      this.isFormValid = false; // Reset form validity state

      // console.log('Submitted users:', this.users);
    }
  }
}
