import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CartEffects } from './store/cart.effects';
import { shoppingCartReducer } from './store/cart.reducer';

export const provideShoppingCart = [
  provideState('shoppingCart', shoppingCartReducer),
  provideEffects(CartEffects),
] as const;
