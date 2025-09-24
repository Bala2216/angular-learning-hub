import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({ name: 'filter', standalone: true })
export class FilterPipe implements PipeTransform {
  transform(employees: Employee[], searchText: string): Employee[] {
    if (!searchText) return employees;
    return employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
