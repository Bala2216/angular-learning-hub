import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import { User, Todo, UserWithTodos } from './user-service';
import { UserService } from './user-service';
import { Observable, forkJoin, BehaviorSubject, switchMap, mergeMap, concatMap, exhaustMap, debounceTime, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-component.html',
  styleUrls: ['./user-component.css']
})

export class UserComponent implements OnInit {


  users = signal<UserWithTodos[]>([]);
  allUsersWithTodos = signal<UserWithTodos[]>([]);

  //allUsersWithTodos: UserWithTodos[] = [];


  //users: User[] = [];
  searchTerm = new FormControl();

  http = inject(HttpClient);

  private searchResults = toSignal(
    this.searchTerm.valueChanges.pipe(
      debounceTime(300),
      switchMap((search: string) => {
        if(!search) {
          return of({ users: this.allUsersWithTodos() });
        }
        return this.http.get<{ users: User[] }>("https://dummyjson.com/users/search?q="+search)
      }),map((res: { users: User[] }) => {
        return res.users
          .map(user => this.allUsersWithTodos().find((u: { id: number; }) => u.id === user.id))
          .filter((user): user is UserWithTodos => !!user);
      })
    )
  );


  constructor() {

    /* this.searchTerm.valueChanges.subscribe((value: string) => {
      this.http.get("https://dummyjson.com/users/search?q="+value).subscribe((res:any) => {
        console.log(res);
      })
    }); */

    effect(() => {
      const results = this.searchResults();
      if (results !== undefined) {
        this.users.set(results);
      }
    });
  }

  ngOnInit(): void {
    const users$ = this.http.get<{users: User[]}>('https://dummyjson.com/users').pipe(
      map((response: { users: any; }) => response.users)
    );

    const todos$ = this.http.get<{todos: Todo[]}>('https://dummyjson.com/todos').pipe(
      map((response: { todos: any; }) => response.todos)
    );

    forkJoin({users: users$ , todos: todos$}).subscribe({
      next: (result: { users: User[], todos: Todo[] }) => {
        const initialUsers = result.users.map(user => {
          const userTodos = result.todos.filter(todo => todo.id === user.id);
          return {
            ...user,
            todosCount: userTodos.length,
            userTodos: userTodos
          }
        });
        this.users.set(initialUsers);
        this.allUsersWithTodos.set(initialUsers);
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
  }

}


