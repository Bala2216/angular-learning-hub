import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { selectCartState } from '../store/cart.selector';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../store/user.actions';
import { CartItem } from '../store/user.reducer';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <h2>🛒 Cart Items</h2>
    @for(item of cartItems; track item.user.name){
    <mat-card>
      <mat-card-content>
        <p><b>Name:</b> {{ item.user.name }}</p>
        <p><b>Email:</b> {{ item.user.email }}</p>
        <p><b>Company:</b> {{ item.user.company.name }}</p>
        <div class="quantity-controls">
          <button mat-mini-button (click)="decrement(item.user.id)">–</button>
          <button mat-button color="red">{{ item.quantity }}</button>
          <button mat-mini-button (click)="increment(item.user.id)">+</button>
        </div>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button color="warn" (click)="remove(item.user.id)">
          <mat-icon>delete</mat-icon> Remove
        </button>
      </mat-card-actions>
    </mat-card>
    }
  `,
  styles: [
    `
      .quantity-controls {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 8px;
      }
    `,
  ],
})
export class CartComponent {
  cartItems: CartItem[] = [];

  constructor(private store: Store) {
    this.store.select(selectCartState).subscribe((state) => {
      this.cartItems = state.items;
    });
  }

  increment(userId: number) {
    this.store.dispatch(incrementQuantity({ userId }));
  }

  decrement(userId: number) {
    this.store.dispatch(decrementQuantity({ userId }));
  }

  remove(userId: number) {
    this.store.dispatch(removeFromCart({ userId }));
  }
}
