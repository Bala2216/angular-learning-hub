import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './user.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');
export const selectCartCount = createSelector(selectCartState, (state) =>
  state.items.reduce((total, item) => total + item.quantity, 0)
);
