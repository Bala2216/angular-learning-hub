import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';

ModuleRegistry.registerModules([AllCommunityModule]);

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  image: string;
}

@Component({
  selector: 'app-user-grid',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './user-grid.component.html',
})
export class UserGridComponent {
    
  rowData: User[] = [];
  columnDefs: ColDef<User>[] = [
    { field: 'id', sortable: true, filter: true },
    { field: 'firstName', sortable: true, filter: true },
    { field: 'lastName', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'gender', sortable: true, filter: true },
    {
      field: 'image',
      headerName: 'Photo',
      cellRenderer: (params: any) =>
        `<img src="${params.value}" class="w-10 h-10 rounded-full" />`,
    },
  ];

  private http = inject(HttpClient);

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    this.http
      .get<{ users: User[] }>('https://dummyjson.com/users?limit=20')
      .subscribe((res) => (this.rowData = res.users));
  }
}
