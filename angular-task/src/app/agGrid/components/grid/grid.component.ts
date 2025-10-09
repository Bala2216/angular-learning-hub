import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MockApiService, Record } from '../../service/mock-api.service';
import { FormsModule } from '@angular/forms';
import { ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, AgGridModule, FormsModule],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent {
  rowData: Record[] = [];
  columnDefs:ColDef<Record>[] = [
    { field: 'id', sortable: true, filter: true },
    { field: 'name', sortable: true, filter: true, editable: true },
    { field: 'age', sortable: true, filter: true, editable: true },
    { field: 'email', sortable: true, filter: true, editable: true },
  ];
  paginationPageSize = 10;

  constructor(private api: MockApiService) {
    this.api.getRecords().subscribe((data) => (this.rowData = data));
  }

  onCellValueChanged(event: any) {
    this.api.updateRecord(event.data);
  }

  newRecord: Record = { id: 0, name: '', age: 0, email: '' };

  addRecord() {
    this.api.addRecord({ ...this.newRecord });
    this.newRecord = { id: 0, name: '', age: 0, email: '' };
  }
}
