import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EmployeeData} from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // Inject HttpClient directly using the `inject()` function
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/employees';

  getEmployees(): Observable<EmployeeData[]> {
    return this.http.get<EmployeeData[]>(this.apiUrl);
  }

  saveEmployees(employee: EmployeeData): Observable<EmployeeData[]> {
    return this.http.post<EmployeeData[]>(this.apiUrl, employee);
  }
}
