import { createAction, props } from '@ngrx/store';

export const addToCart = createAction('[Cart] Add', props<{ product: any }>());
export const removeFromCart = createAction(
  '[Cart] Remove',
  props<{ productId: number }>()
);
export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; quantity: number }>()
);
