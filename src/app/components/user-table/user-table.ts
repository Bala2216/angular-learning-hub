import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserFilterPipe } from '../../pipes/user-filter-pipe';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first-pipe';
import { CustomDatePipe } from '../../pipes/custom-date-pipe';
import { AdvancedUserFormModel } from '../../models/advanced-user-form';

@Component({
  selector: 'app-user-table',
  imports: [UserFilterPipe, CapitalizeFirstPipe, CustomDatePipe],
  templateUrl: './user-table.html',
  styleUrl: './user-table.css',
})
export class UserTable {
  @Input() usersList: AdvancedUserFormModel[] = [];
  @Input() searchText: string = '';
  @Output() onEdit = new EventEmitter<AdvancedUserFormModel>();
  @Output() onDelete = new EventEmitter<AdvancedUserFormModel>();
}
