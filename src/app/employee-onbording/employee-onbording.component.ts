import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { rankWith, isEnumControl, isStringControl } from '@jsonforms/core';
import { RadioEnumRendererComponent } from '../custom-renderers/RadioEnumRendererComponent';
import { DropdownEnumRendererComponent } from '../custom-renderers/DropdownEnumRendererComponent';
import { TextboxRendererComponent } from '../custom-renderers/TextboxRendererComponent';
import schema from '../../schema/schema.json';
import uischema from '../../schema/uischema.json';
import { SubscriptionService } from '../subscription-service';
import { EmployeeData } from '../employee';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-onbording',
  imports: [MatInputModule, 
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule, JsonFormsAngularMaterialModule],
  templateUrl: './employee-onbording.component.html',
  styleUrl: './employee-onbording.component.css'
})
export class EmployeeOnbordingComponent {
  schema = schema;
  uischema = uischema;
  data: { name?: string; email?: string; department?: string; employmentType?: string; gender?: string } = {};
  
  constructor(private employeeService: EmployeeService, private router: Router, private subscriptionService: SubscriptionService) {}
  renderers = [ 
    ...angularMaterialRenderers,
    {
      tester: rankWith(3,
        (uischema, schema, path) => isStringControl(uischema, schema, path) &&
      uischema.options?.['format'] === 'textbox'
      ),
      renderer: TextboxRendererComponent
    },
    {
      tester: rankWith(3, (uischema, schema, path) =>
      isEnumControl(uischema, schema, path) &&
      uischema.options?.['format'] === 'dropdown'
    ),
      renderer: DropdownEnumRendererComponent
    },
    {
    tester: rankWith(3, (uischema, schema, path) =>
      isEnumControl(uischema, schema, path) &&
      uischema.options?.['format'] === 'radio'
    ),
    renderer: RadioEnumRendererComponent
    }
  ];

  onChange(event: any) {
    this.data = event;
  }

  submitForm() {
    console.log('Form submitted:', this.data);
    const employee: EmployeeData = {
      name: this.data.name || 'John Doe',
      email: this.data.email || '',
      department: this.data.department || '',  
      employmentType: this.data.employmentType || '',
      gender: this.data.gender || 'male',
    };
    this.subscriptionService.add(employee);
    this.data = {name: '', email: '', department: ''};
    this.employeeService.saveEmployees(employee).subscribe({
      next: (response: any) => { console.log('Employee saved successfully:', response); 
        this.router.navigate(['']); },
      error: (error: any) => { console.error('Error saving employee:', error); }
    })
    // this.employeeService.saveEmployees(employee).subscribe(response => {
    //   console.log('Employee saved successfully:', response);
    //   this.router.navigate(['']);
    // }, error => {
    //   console.error('Error saving employee:', error);
    // });
  }
}
