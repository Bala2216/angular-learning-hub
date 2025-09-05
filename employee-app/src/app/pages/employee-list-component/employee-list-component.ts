import { Component, Input, Output, EventEmitter,  OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list-component',
  imports: [CommonModule],
  templateUrl: './employee-list-component.html',
  styleUrl: './employee-list-component.css'
})
export class EmployeeListComponent implements OnChanges{

  @Input() employees: any[] = [];
  @Output() deleteRow = new EventEmitter<number>();

  sortedEmployees: any[] = [];

  onDelete(index: number) {
    this.deleteRow.emit(index);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employees']) {
     this.sortedEmployees = this.employees.map(item => ({
        ...item,
        name: item.name ? item.name.charAt(0).toUpperCase() + item.name.slice(1) : item.name
      }));
    }
  }
}
