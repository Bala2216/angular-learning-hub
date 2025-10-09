import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  ModuleRegistry,
} from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { ColumnsToolPanelModule, SideBarModule } from 'ag-grid-enterprise';
import { FormsModule } from '@angular/forms';

ModuleRegistry.registerModules([
  AllCommunityModule,
  SideBarModule,
  ColumnsToolPanelModule,
]);

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  image: string;
  age: number;
}

@Component({
  selector: 'app-full-grid',
  standalone: true,
  imports: [CommonModule, AgGridModule, FormsModule],
  templateUrl: './full-grid.component.html',
})
export class FullGridComponent {
  private http = inject(HttpClient);
  private gridApi!: GridApi;
  rowData: User[] = [];
  selectedRows: User[] = [];
  currentPage = 0;
  pageSize = 50;

  columnDefs: (ColDef<User> | ColGroupDef<User>)[] = [
    {
      headerName: 'Name',
      children: [
        { field: 'firstName', sortable: true, filter: true, editable: true },
        { field: 'lastName', sortable: true, filter: true, editable: true },
      ],
    },
    { field: 'email', sortable: true, filter: true },
    { field: 'gender', sortable: true, filter: true },
    { field: 'age', sortable: true, filter: true, editable: true },
    // {
    //   headerName: 'Photo',
    //   field: 'image',
    //   cellRenderer: (params: any) =>
    //     `<img src="${params.value}" class="w-10 h-10 rounded-full" />`,
    // },
  ];

  gridOptions: GridOptions<User> = {
    pagination: true,
    paginationPageSize: this.pageSize,
    rowSelection: 'multiple',
    editType: 'fullRow',
    //sideBar: 'columns',
    onGridReady: (params: any) => {
      this.gridApi = params.api;
      this.loadUsers();
    },
    onPaginationChanged: () => {
      //const page = this.gridApi.paginationGetCurrentPage();
      //this.loadUsers(page);
    },
    onSelectionChanged: () => {
      this.selectedRows = this.gridApi.getSelectedRows();
      console.log('Selected:', this.selectedRows);
    },
    onCellValueChanged: (event: any) => {
      console.log('Updated:', event.data);
      const updatedUser = event.data;
      console.log('Updated row:', updatedUser);

      this.http
        .put(`https://dummyjson.com/users/${updatedUser.id}`, updatedUser)
        .subscribe((res) => {
          console.log('Server updated:', res);
        });
    },
  };

  loadUsers() {;
    this.http
      .get<{ users: User[] }>(
        `https://dummyjson.com/users?limit=${this.pageSize}`
      )
      .subscribe((res) => (this.rowData = res.users));
  }

  onExport() {
    this.gridApi.exportDataAsCsv();
  }
}
