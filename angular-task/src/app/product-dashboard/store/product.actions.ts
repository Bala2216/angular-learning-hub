import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction('[Product] Load');
export const loadProductsSuccess = createAction(
  '[Product] Load Success',
  props<{ products: any[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Failure',
  props<{ error: any }>()
);
