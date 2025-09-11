import { Component, OnInit } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { AdvancedUserFormJsonSchema, AdvancedUserFormUISchema } from '../forms-schema/advanced-user-form';
import { JsonFormsModule } from '@jsonforms/angular';
import { advancedUserFormService } from '../services/advanced-user-form-service';
import { AdvancedUserFormModel } from '../models/advanced-user-form';

@Component({
  selector: 'app-advanced-user-form',
  imports: [JsonFormsModule],
  templateUrl: './advanced-user-form.html',
  styleUrl: './advanced-user-form.css'
})
export class AdvancedUserForm implements OnInit {
  data: any = {};
  usersList: AdvancedUserFormModel[] = [];

  renderers =  angularMaterialRenderers;

  schema = AdvancedUserFormJsonSchema
  uischema = AdvancedUserFormUISchema

  constructor(private advancedUserFormService: advancedUserFormService) {}

  ngOnInit(): void {
    this.advancedUserFormService.getUsers().subscribe(resp => {
      console.log('getUsersList', resp.users)
      this.usersList = resp.users
    })
  }
  onDataChange(event: any) {
    this.data = event
    console.log('event.data', event)
  }
  
  onSubmit() {
    console.log('Submit Data', this.data)
    this.advancedUserFormService.createUser(this.data).subscribe((resp: any) => {
      console.log('created', resp)
    })
  }
}
