import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef, AllCommunityModule, ModuleRegistry, themeQuartz, GridApi , GridReadyEvent} from "ag-grid-community";
import { Observable } from 'rxjs';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-ag-grid-component',
  imports: [AgGridAngular, HttpClientModule, CommonModule],
  templateUrl: './ag-grid-component.html',
  styleUrl: './ag-grid-component.css'
})
export class AgGridComponent implements OnInit{
  private gridApi!: GridApi;

  userList!: Observable<any[]>;

  public theme = themeQuartz;

  colDefs: ColDef[] = [
    { field: "id", headerName: "ID", checkboxSelection: true, headerCheckboxSelection: true,
    cellRenderer: (items: any) => {
      return 'EMP ' + items.value;
    }},
    { field: "name" , filter: true },
    { field: "username", editable: true },
    { field: "email" },
    { field: "phone" }
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  constructor( private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  getUsers() {
    this.userList = this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }

}
