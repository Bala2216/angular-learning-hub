import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CartActions from './cart.actions';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Injectable()
export class CartEffects {
  private readonly actions$ = inject(Actions);
  private readonly productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products: Product[]) => {
            console.log('Products loaded:', products);
            return CartActions.loadProductsSuccess({ products });
          }),
          catchError((error) => {
            console.error('Error loading products:', error);
            return of(
              CartActions.loadProductsFailure({ error: error.message })
            );
          })
        )
      )
    )
  );
}
