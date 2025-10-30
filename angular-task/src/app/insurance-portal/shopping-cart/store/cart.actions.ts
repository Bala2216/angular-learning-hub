import { createAction, props } from '@ngrx/store';
import { CartItem, Product } from '../models/product.model';

export const loadProducts = createAction('[Shopping Cart] Load Products');
export const loadProductsSuccess = createAction(
  '[Shopping Cart] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Shopping Cart] Load Products Failure',
  props<{ error: any }>()
);

export const addToCart = createAction(
  '[Shopping Cart] Add To Cart',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Shopping Cart] Remove From Cart',
  props<{ productId: number }>()
);

export const updateCartItemQuantity = createAction(
  '[Shopping Cart] Update Cart Item Quantity',
  props<{ productId: number; quantity: number }>()
);

export const clearCart = createAction('[Shopping Cart] Clear Cart');