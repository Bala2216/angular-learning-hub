import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { UserService } from "../../services/users.service";
import { User } from '../../modal/claim.model';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>();

  editingUserId: number | null = null;
  editedUser: User = { id: 0, name: '', email: '' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) {}

  ngAfterViewInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editUser(user: User): void {
    const updatedUser = { ...user, name: user.name + ' (edited)' };
    this.userService.updateUser(updatedUser).subscribe(() => this.loadUsers());
  }

  // deleteUser(user: Employee): void {
  //   this.userService.deleteUser(user.id).subscribe(() => this.loadUsers());
  // }

  startEdit(user: User): void {
    this.editingUserId = user.id;
    this.editedUser = { ...user };
  }

  cancelEdit(): void {
    this.editingUserId = null;
  }

  saveEdit(): void {
    this.userService.updateUser(this.editedUser).subscribe({
      next: () => {
        this.editingUserId = null;
        this.loadUsers(); // refresh table
      },
      error: (err) => console.error('Update failed', err),
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Delete failed', err),
    });
  }
}
