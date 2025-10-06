import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { User, Photo } from '../services/user.service';
import { Store } from '@ngrx/store';
import { addToCart } from '../store/user.actions';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div class="card-container">
      <mat-card class="user-card">
        <mat-card-content>
          <p><b>Name:</b> {{ user.name }}</p>
          <p><b>Email:</b> {{ user.email }}</p>
          <p><b>Company:</b> {{ user.company.name }}</p>
          <p>
            <img mat-card-image [src]="getPhotoUrl(user.id)" alt="User photo" />
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="primary" (click)="addToCart()">
            Add to Cart
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .card-container {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        justify-content: center;
        padding: 16px;
      }

      .user-card {
        width: 300px;
        flex: 1 1 300px;
      }
    `,
  ],
})
export class UserCardComponent {
  @Input() user!: User;
  @Input() photo!: Photo;

  private store = inject(Store);

  getPhotoUrl(userId: number): string {
    return `https://picsum.photos/id/${userId}/200/100`;
  }

  addToCart() {
    this.store.dispatch(addToCart({ user: this.user }));
  }
}
