import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EmployeeData, Role} from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // Inject HttpClient directly using the `inject()` function
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  getEmployees(filterString: string): Observable<EmployeeData[]> {
    if (filterString === '') {
      return this.http.get<EmployeeData[]>(this.apiUrl + "/employees");
    } else {
      return this.http.get<EmployeeData[]>(`${this.apiUrl}/employees?name_like=${filterString}`);
    }
  }

  getRoles(): Observable<Role> {
    return this.http.get<Role>(this.apiUrl + "/role");
  }

  saveEmployees(employee: EmployeeData): Observable<EmployeeData[]> {
    return this.http.post<EmployeeData[]>(this.apiUrl + "/employees", employee);
  }
}
