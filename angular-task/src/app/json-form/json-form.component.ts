import { Component, Input, signal } from '@angular/core';
import { schema, uischema } from './form-schema';
import { FormsModule } from '@angular/forms';
import { JsonFormsModule } from '@jsonforms/angular';
import { angularMaterialRenderers, JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { CommonModule } from '@angular/common';

interface Employee {
  name: string;
  age: number | null;
  phoneNumber: string;
}

@Component({
  selector: 'app-json-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
  ],
  templateUrl: './json-form.component.html',
  styleUrl: './json-form.component.scss',
})
export class JsonFormComponent {
  schema = schema;
  uischema = uischema;
  renderers = angularMaterialRenderers;
  editingIndex = signal<number | null>(null);
  formData = signal<Employee>({ name: '', age: 0, phoneNumber: '' });
  data = signal<{ employee: Employee[] }>({
    employee: [{ name: 'User1', age: 30, phoneNumber: '9876543210' }],
  });

  onChange(event: any) {
    this.formData.set(event.data);
    console.log('updated form data', this.data());
  }

  editEmployee(index: number) {
    const selected = this.data().employee[index];
    this.formData.set({ ...selected });
    this.editingIndex.set(index);
  }

  // submitEmployee() {
  //   const current = this.formData();
  //   const index = this.editingIndex();
  //   this.data.update((item) => {
  //     const updatedList = [...item.employee];
  //     if (index !== null) {
  //       updatedList[index] = current;
  //     } else {
  //       updatedList.push(current);
  //     }
  //     return { employee: updatedList };
  //   });
  //   this.editingIndex.set(null);
  //   this.formData.set({ name: '', age: null, phoneNumber: '' });
  // }
  submitEmployee() {
    const current = this.formData();
    const index = this.editingIndex();

    const updatedList = [...this.data().employee];

    if (index !== null) {
      updatedList[index] = current;
    } else {
      updatedList.push(current);
    }

    // ✅ Set the full object, not just the array
    this.data.set({ employee: updatedList });

    // Reset form
    this.editingIndex.set(null);
    this.formData.set({ name: '', age: null, phoneNumber: '' });
  }
}
