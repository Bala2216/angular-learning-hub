import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/product.model';
import * as CartActions from '../../store/cart.actions';
import * as CartSelectors from '../../store/cart.selectors';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <div class="cart-container">
      <h2>Shopping Cart</h2>

      <table
        mat-table
        [dataSource]="(cartItems$ | async) || []"
        class="mat-elevation-z8"
      >
        <ng-container matColumnDef="image">
          <th mat-header-cell *matHeaderCellDef>Image</th>
          <td mat-cell *matCellDef="let item">
            <img
              [src]="item.imageUrl"
              [alt]="item.name"
              class="product-image"
              (error)="handleImageError($event)"
            />
          </td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Product</th>
          <td mat-cell *matCellDef="let item">{{ item.name }}</td>
        </ng-container>

        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef>Price</th>
          <td mat-cell *matCellDef="let item">{{ item.price | currency }}</td>
        </ng-container>

        <ng-container matColumnDef="quantity">
          <th mat-header-cell *matHeaderCellDef>Quantity</th>
          <td mat-cell *matCellDef="let item">
            <button
              mat-icon-button
              (click)="updateQuantity(item.id, item.cartQuantity - 1)"
              [disabled]="item.cartQuantity <= 1"
            >
              <mat-icon>remove</mat-icon>
            </button>
            {{ item.cartQuantity }}
            <button
              mat-icon-button
              (click)="updateQuantity(item.id, item.cartQuantity + 1)"
              [disabled]="item.cartQuantity >= item.quantity"
            >
              <mat-icon>add</mat-icon>
            </button>
          </td>
        </ng-container>

        <ng-container matColumnDef="total">
          <th mat-header-cell *matHeaderCellDef>Total</th>
          <td mat-cell *matCellDef="let item">
            {{ item.price * item.cartQuantity | currency }}
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let item">
            <button
              mat-icon-button
              color="warn"
              (click)="removeFromCart(item.id)"
            >
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <div class="cart-summary" *ngIf="cartTotal$ | async as total">
        <h3>Total: {{ total | currency }}</h3>
        <button mat-raised-button color="warn" (click)="clearCart()">
          Clear Cart
        </button>
        <button mat-raised-button color="primary">Checkout</button>
      </div>
    </div>
  `,
  styles: [
    `
      .cart-container {
        padding: 20px;
      }
      .product-image {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
      table {
        width: 100%;
      }
      .cart-summary {
        margin-top: 20px;
        text-align: right;
      }
      .cart-summary button {
        margin-left: 10px;
      }
    `,
  ],
})
export class ShoppingCartComponent {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  displayedColumns: string[] = [
    'image',
    'name',
    'price',
    'quantity',
    'total',
    'actions',
  ];

  constructor(private store: Store) {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.cartTotal$ = this.store.select(CartSelectors.selectCartTotal);
  }

  updateQuantity(productId: number, quantity: number) {
    this.store.dispatch(
      CartActions.updateCartItemQuantity({ productId, quantity })
    );
  }

  removeFromCart(productId: number) {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/01.png'; // fallback image
  }
}
