import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component'; // ✅ NEW
import { UserFilterPipe } from '../../pipes/user-filter.pipe';
import { EmailDomainDirective } from '../../directives/emaildomain-color.directive';
import { InputComponent } from '../input/input.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatTableModule } from '@angular/material/table';

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
  ],
  exports: [
    UserListComponent,
    AddUserComponent,
    InputComponent,
    UserFilterPipe,
    EmailDomainDirective,
  ],
})
export class UserModule {}
