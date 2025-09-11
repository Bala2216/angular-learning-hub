import { Component, OnInit } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { AdvancedUserFormJsonSchema, AdvancedUserFormUISchema } from '../forms-schema/advanced-user-form';
import { JsonFormsModule } from '@jsonforms/angular';
import { advancedUserFormService } from '../services/advanced-user-form-service';
import { AdvancedUserFormModel } from '../models/advanced-user-form';
import { FormsModule } from '@angular/forms';
import { UserFilterPipe } from '../pipes/user-filter-pipe';
import { CapitalizeFirstPipe } from '../pipes/capitalize-first-pipe';
import { CustomDatePipe } from '../pipes/custom-date-pipe';

@Component({
  selector: 'app-advanced-user-form',
  imports: [JsonFormsModule, FormsModule, UserFilterPipe, CapitalizeFirstPipe, CustomDatePipe],
  templateUrl: './advanced-user-form.html',
  styleUrl: './advanced-user-form.css'
})
export class AdvancedUserForm implements OnInit {
  renderers =  angularMaterialRenderers;
  schema = AdvancedUserFormJsonSchema
  uischema = AdvancedUserFormUISchema
  data: any = {};
  usersList: AdvancedUserFormModel[] = [];  
  searchText: string = '';

  constructor(private advancedUserFormService: advancedUserFormService) {}

  ngOnInit(): void {
    this.advancedUserFormService.getUsers().subscribe(resp => {
      console.log('getUsersList', resp.users)
      this.usersList = resp.users
      this.sortUsersByIdDesc();
    })
  }
  
sortUsersByIdDesc() {
    this.usersList.sort((a, b) => b.id - a.id);
  }

  onDataChange(event: any) {
    this.data = event
    console.log('event.data', event)
  }
  
  onSubmit() {
    console.log('Submit Data', this.data)
    this.advancedUserFormService.createUser(this.data).subscribe((resp: any) => {
      console.log('created', resp)
      this.usersList.push({...resp})
      this.sortUsersByIdDesc();
      this.data = {}
    })
  }
}
