import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { rankWith, isEnumControl, isStringControl } from '@jsonforms/core';
import { RadioEnumRendererComponent } from './custom-renderers/RadioEnumRendererComponent';
import { DropdownEnumRendererComponent } from './custom-renderers/DropdownEnumRendererComponent';
import { TextboxRendererComponent } from './custom-renderers/TextboxRendererComponent';
import schema from '../schema/schema.json';
import uischema from '../schema/uischema.json';
import { EmployeeOnbordingComponent } from "./employee-onbording/employee-onbording.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule, JsonFormsAngularMaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  schema = schema;
  uischema = uischema;
  data = {name: '', email: '', department: ''};
  
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

  }
}