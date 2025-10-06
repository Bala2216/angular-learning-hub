import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserState } from '../store/user.reducer';
import { loadUsers } from '../store/user.actions';
import { UserCardComponent } from './user-card.component';
import { User, Photo } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  template: `
    <div class="grid">
      @for (user of filteredUsers; track user.name) {
      <app-user-card [user]="user" [photo]="getPhoto(user.id)"></app-user-card>
      }
    </div>
  `,
  styles: [
    `
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
      }
    `,
  ],
})
export class UserListComponent implements OnInit {
  @Input() filterText = '';
  users: User[] = [];
  photos: Photo[] = [];
  private store = inject(Store<{ userState: UserState }>);

  ngOnInit() {
    this.store.dispatch(loadUsers());
    this.store.select('userState').subscribe((state) => {
      if (state?.users && state?.photos) {
        this.users = state.users;
        this.photos = state.photos;
      }
    });
  }

  get filteredUsers(): User[] {
    return this.users.filter((u) =>
      u.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  getPhoto(userId: number): Photo {
    return this.photos.find((p) => p.id === userId)!;
  }
}
