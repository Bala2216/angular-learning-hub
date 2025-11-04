import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../services/product.service';
import { loadProducts, loadProductsSuccess } from './product.actions';
import { map, switchMap } from 'rxjs';

@Injectable()
export class ProductEffects {
  load$;

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {
    console.log('Actions stream:', actions$);
    this.load$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadProducts),
        switchMap(() => this.productService.getProducts()),
        map((products: any) => loadProductsSuccess({ products }))
      )
    );
  }
}
