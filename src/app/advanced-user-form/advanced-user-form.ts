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
import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  from,
  map,
  mergeMap,
  of,
  Subject,
  switchMap,
  toArray,
} from 'rxjs';

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
  usersWithPosts: any[] = [];

  totalUsers: number = 0;
  maleUsers: number = 0;
  femaleUsers: number = 0;

  searchText: string = '';
  private searchSubject$ = new Subject<string>();
  constructor(private advancedUserFormService: advancedUserFormService) {}

  ngOnInit(): void {
    this.getUsersListOnInitialLoad();
    this.searchUsersInAPISwitchMap(); // Need cancellation of previous request
    // this.searchUsersAndPostsWithMergeMap(); //Need concurrency
    // this.searchUsersAndPostsWithconcatMap(); //Need sequential execution
    this.searchUserWithFilter();
  }

  onSearchInputChange(searchTerm: string): void {
    // this.searchText = searchTerm;
    this.searchSubject$.next(searchTerm);
  }

  searchUserWithFilter(): void {
    this.searchSubject$
      .pipe(
        filter((query: string) => query.trim().length > 2), // Ignore short/empty queries
        debounceTime(300), // Wait for user to stop typing
        distinctUntilChanged(), // Avoid duplicate searches
        switchMap((query: string) =>
          this.advancedUserFormService.searchUsers(query).pipe(
            map((res) => res.users),
            catchError(() => of([]))
          )
        )
      )
      .subscribe((users) => {
        this.usersList = users;
         console.log('Users with filter concept:', this.usersList);
      });
  }

  searchUsersAndPostsWithconcatMap(): void {
    this.searchSubject$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        concatMap((query: string) =>
          this.advancedUserFormService.searchUsers(query).pipe(
            map((res) => res.users),
            concatMap((users) =>
              from(users).pipe(
                concatMap((user: any) =>
                  this.advancedUserFormService.getPostsByUserId(user.id).pipe(
                    map((posts) => ({
                      ...user,
                      fullName: `${user.firstName} ${user.lastName}`,
                      gender: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
                      posts,
                    })),
                    catchError(() => of({ ...user, posts: [] }))
                  )
                ),
                toArray()
              )
            ),
            catchError((err) => {
              console.error('Search error:', err);
              return of([]);
            })
          )
        )
      )
      .subscribe((results) => {
        this.usersWithPosts = results;
        console.log('Users with posts (sequential):', results);
      });
  }

  searchUsersAndPostsWithMergeMap(): void {
    this.searchSubject$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        mergeMap((query: string) =>
          this.advancedUserFormService.searchUsers(query).pipe(
            map((res) => res.users),
            mergeMap((users) =>
              from(users).pipe(
                mergeMap((user: any) =>
                  this.advancedUserFormService.getPostsByUserId(user.id).pipe(
                    map((posts) => ({
                      ...user,
                      fullName: `${user.firstName} ${user.lastName}`,
                      gender: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
                      posts,
                    })),
                    catchError(() => of({ ...user, posts: [] }))
                  )
                ),
                toArray()
              )
            ),
            catchError((err) => {
              console.error('Search error:', err);
              return of([]);
            })
          )
        )
      )
      .subscribe((results) => {
        this.usersWithPosts = results;
        console.log('Users with posts:', results);
      });
  }

  searchUsersInAPISwitchMap(): void {
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

  getUsersListOnInitialLoad() {
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
      this.getUsersListOnInitialLoad();
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
