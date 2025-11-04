import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartItem } from './cart.reducer';

export const selectCart = createFeatureSelector<CartItem[]>('cart');

export const selectCartTotal = createSelector(selectCart, (cart) =>
  cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
);

export const selectCartCount = createSelector(selectCart, (cart) =>
  cart.reduce((count, item) => count + item.quantity, 0)
);
