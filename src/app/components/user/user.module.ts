import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserFilterPipe } from '../../pipes/user-filter.pipe';
import { GenderColorDirective } from '../../directives/gender-color.directive';

@NgModule({
  declarations: [
    UserListComponent,
    UserFilterPipe,
    GenderColorDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [UserListComponent]
})
export class UserModule {}
