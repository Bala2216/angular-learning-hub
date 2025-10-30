import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import * as CartActions from '../../store/cart.actions';
import * as CartSelectors from '../../store/cart.selectors';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatBadgeModule,
  ],
  template: `
    <div class="page-container">
      <div class="header">
        <h1>Products</h1>
        <button
          mat-raised-button
          color="accent"
          class="cart-button"
          (click)="viewCart()"
        >
          <mat-icon>shopping_cart</mat-icon>
          Cart ({{ cartItemCount$ | async }})
        </button>
      </div>
      <div class="product-grid">
        <mat-grid-list cols="3" rowHeight="450px" gutterSize="16px">
          <mat-grid-tile *ngFor="let product of products$ | async">
            <mat-card class="product-card">
              <mat-card-header>
                <mat-card-title>{{ product.name }}</mat-card-title>
              </mat-card-header>
              <img
                mat-card-image
                [src]="product.imageUrl"
                [alt]="product.name"
                (error)="handleImageError($event)"
              />
              <mat-card-content>
                <p>{{ product.description }}</p>
                <p class="price">{{ product.price | currency }}</p>
                <p *ngIf="product.quantity === 0" class="out-of-stock">
                  Out of Stock
                </p>
                <p *ngIf="product.quantity > 0" class="in-stock">
                  In Stock: {{ product.quantity }}
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button
                  mat-raised-button
                  color="primary"
                  (click)="addToCart(product)"
                  [disabled]="product.quantity === 0"
                >
                  <mat-icon>add_shopping_cart</mat-icon>
                  Add to Cart
                </button>
              </mat-card-actions>
            </mat-card>
          </mat-grid-tile>
        </mat-grid-list>
      </div>
    </div>
  `,
  styles: [
    `
      .page-container {
        padding: 20px;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 0 16px;
      }
      .cart-button {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .product-grid {
        padding: 20px;
      }
      .product-card {
        width: 300px;
        margin: 16px;
        display: flex;
        flex-direction: column;
      }
      .price {
        font-size: 1.5em;
        color: #673ab7;
        font-weight: bold;
        margin: 16px 0;
      }
      img {
        height: 200px;
        object-fit: cover;
      }
      .out-of-stock {
        color: #f44336;
        font-weight: bold;
      }
      .in-stock {
        color: #4caf50;
      }
      mat-card-content {
        flex-grow: 1;
      }
      mat-card-actions {
        display: flex;
        justify-content: center;
        padding: 16px;
      }
      mat-card-header {
        padding: 16px;
      }
      mat-card-title {
        font-size: 1.2em;
        margin: 0;
      }
    `,
  ],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  cartItemCount$: Observable<number>;

  // Add a method to view cart
  viewCart() {
    this.router.navigate(['shopping/cart']);
  }

  constructor(private store: Store, private router: Router) {
    console.log('ProductListComponent initialized');
    this.products$ = this.store.select(CartSelectors.selectProducts);
    this.cartItemCount$ = this.store
      .select(CartSelectors.selectCartItems)
      .pipe(
        map((items) =>
          items.reduce((total, item) => total + item.cartQuantity, 0)
        )
      );

    // Add subscription to log products
    this.products$.subscribe(
      (products) => console.log('Products from store:', products),
      (error) => console.error('Error getting products:', error)
    );
  }

  ngOnInit() {
    console.log('ProductListComponent ngOnInit');
    this.store.dispatch(CartActions.loadProducts());
  }

  addToCart(product: Product) {
    console.log('Adding to cart:', product);
    this.store.dispatch(CartActions.addToCart({ product }));
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/01.png'; // fallback image
  }
}
