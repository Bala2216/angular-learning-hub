import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('shoppingCart');

export const selectProducts = createSelector(
  selectCartState,
  state => state.products
);

export const selectCartItems = createSelector(
  selectCartState,
  state => state.cartItems
);

export const selectCartTotal = createSelector(
  selectCartItems,
  items => items.reduce((total, item) => total + (item.price * item.cartQuantity), 0)
);

export const selectCartItemsCount = createSelector(
  selectCartItems,
  items => items.reduce((count, item) => count + item.cartQuantity, 0)
);

export const selectIsLoading = createSelector(
  selectCartState,
  state => state.loading
);

export const selectError = createSelector(
  selectCartState,
  state => state.error
);