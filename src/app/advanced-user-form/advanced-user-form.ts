import { Component, OnInit } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import {
  AdvancedUserFormJsonSchema,
  AdvancedUserFormUISchema,
} from '../forms-schema/advanced-user-form';
import { JsonFormsModule } from '@jsonforms/angular';
import { advancedUserFormService } from '../services/advanced-user-form-service';
import { AdvancedUserFormModel } from '../models/advanced-user-form';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { SearchInput } from '../components/search-input/search-input';
import { UserTable } from '../components/user-table/user-table';
import { catchError, debounceTime, distinctUntilChanged, map, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-advanced-user-form',
  imports: [JsonFormsModule, FormsModule, SearchInput, UserTable],
  templateUrl: './advanced-user-form.html',
  styleUrl: './advanced-user-form.css',
})
export class AdvancedUserForm implements OnInit {
  renderers = angularMaterialRenderers;
  schema = AdvancedUserFormJsonSchema;
  uischema = AdvancedUserFormUISchema;
  data: any = {};
  usersList: AdvancedUserFormModel[] = [];

  totalUsers: number = 0;
  maleUsers: number = 0;
  femaleUsers: number = 0;

  searchText: string = '';
  private searchSubject$ = new Subject<string>();
  constructor(private advancedUserFormService: advancedUserFormService) {}

  ngOnInit(): void {
    this.getUsersList();
    this.searchUsersInAPI();
  }

  onSearchInputChange(searchTerm: string): void {
    // this.searchText = searchTerm;
    this.searchSubject$.next(searchTerm);
  }

  searchUsersInAPI(): void {
    this.searchSubject$
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((query: string) =>
          this.advancedUserFormService.searchUsers(query).pipe(
            map((response) =>
              response.users.map((user: any) => ({
                ...user,
                fullName: `${user.firstName} ${user.lastName}`,
                gender: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
              }))
            ),
            catchError((error) => {
              console.error('Search error', error);
              return of([]);
            })
          )
        )
      )
      .subscribe((results: AdvancedUserFormModel[]) => {
        this.usersList = results;
        this.sortUsersByIdDesc();
        this.updateUserCounts();
      });
  }

  getUsersList() {
    this.advancedUserFormService
      .getUsers()
      .pipe(
        map((response) =>
          response.users.map((user: any) => ({
            ...user,
            fullName: `${user.firstName} ${user.lastName}`,
            gender: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
          }))
        ),
        catchError((error) => {
          console.error('Error fetching users', error);
          return of([]); // Return empty array on error
        })
      )
      .subscribe((transformedUsers) => {
        console.log('transformedUsers ', transformedUsers);
        this.usersList = transformedUsers;
        this.sortUsersByIdDesc();
        this.updateUserCounts();
      });
  }

  sortUsersByIdDesc() {
    this.usersList.sort((a, b) => b.id - a.id);
  }

  onDataChange(event: any) {
    this.data = event;
    // console.log('event.data', event);[]
  }

  onSubmit() {
    this.advancedUserFormService.createUser(this.data).subscribe((resp: any) => {
      console.log('created', resp);
      this.usersList.push({
        ...resp,
        fullName: `${resp.firstName} ${resp.lastName}`,
        gender: resp.gender.charAt(0).toUpperCase() + resp.gender.slice(1),
      });
      this.sortUsersByIdDesc();
      this.data = {};
      this.closeModal();
      this.updateUserCounts();
    });
  }

  onEdit(user: AdvancedUserFormModel) {
    alert('Ready for Edit: ' + JSON.stringify(user));
    this.data = user;
  }

  onDelete(user: AdvancedUserFormModel) {
    if (confirm('Are you sure to delete?')) {
      this.usersList = this.usersList.filter((data: AdvancedUserFormModel) => data.id !== user.id);
    }
  }

  updateUserCounts(): void {
    this.totalUsers = this.usersList.length;
    this.maleUsers = this.usersList.filter(
      (user: AdvancedUserFormModel) => user.gender.toLowerCase() === 'male'
    ).length;
    this.femaleUsers = this.usersList.filter(
      (user: AdvancedUserFormModel) => user.gender.toLowerCase() === 'female'
    ).length;
  }

  reloadUsers(): void {
    this.usersList = [];
    setTimeout(() => {
      this.getUsersList();
    }, 20);
  }

  modalInstance: any;
  ngAfterViewInit() {
    const modalEl = document.getElementById('exampleModal');
    if (modalEl) {
      this.modalInstance = new bootstrap.Modal(modalEl);
    }
  }

  openModal() {
    this.modalInstance?.show();
  }

  closeModal() {
    this.modalInstance?.hide();
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
    document.body.classList.remove('modal-open');
  }
}
