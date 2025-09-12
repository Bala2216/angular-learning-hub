import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserFilterPipe } from '../../pipes/user-filter.pipe';
import { EmailDomainDirective } from '../../directives/emaildomain-color.directive';
import { InputComponent } from '../input/input.component';

@NgModule({
  declarations: [
    UserListComponent,
    InputComponent,
    UserFilterPipe,
    EmailDomainDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [UserListComponent]
})
export class UserModule {}
