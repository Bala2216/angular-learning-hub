import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MatTableModule } from '@angular/material/table';
import { DxDataGridModule } from 'devextreme-angular';
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { InputComponent } from '../input/input.component';
import { UserFilterPipe } from '../../pipes/user-filter.pipe';
import { EmailDomainDirective } from '../../directives/emaildomain-color.directive';

@NgModule({
  declarations: [
    UserListComponent,
    AddUserComponent,
    InputComponent,
    UserFilterPipe,
    EmailDomainDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    AgGridModule,
    DxDataGridModule,
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
  ],
  exports: [
    UserListComponent,
    AddUserComponent,
    InputComponent,
    UserFilterPipe,
    EmailDomainDirective,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule {}
