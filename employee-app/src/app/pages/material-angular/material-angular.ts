import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-material-angular',
  imports: [HttpClientModule, CommonModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatCheckboxModule],
  templateUrl: './material-angular.html',
  styleUrl: './material-angular.css'
})
export class MaterialAngular implements OnInit{

  loading: boolean = false;

  userList!: Observable<any[]>;

  expandedUser: any = null;

  constructor( private http: HttpClient) {}

  displayedColumns: string[] = ['select', 'id', 'name', 'username', 'email', 'phone'];

  dataSource = new MatTableDataSource<any[]>();

  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

   // Use a setter for MatSort
   @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onToggleRow(user: any) {
    this.expandedUser = this.expandedUser === user ? null : user;
  }

  onToggleSelection(user: any) {
    this.selection.toggle(user);
  }

  isAllSelected() {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
       this.selection.select(...this.dataSource.data);
    }
  }

  getUsers() {
    this.loading = true;
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').subscribe({
      next: (users: any[]) => {
        this.dataSource.data = users;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Failed to load users', err);
        this.loading = false;
      }
    });
  }

}
