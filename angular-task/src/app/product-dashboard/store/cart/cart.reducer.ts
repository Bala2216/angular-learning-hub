import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, updateQuantity } from './cart.actions';

export interface CartItem {
  product: any;
  quantity: number;
}

export const initialCartState: CartItem[] = [];

export const cartReducer = createReducer(
  initialCartState,
  on(addToCart, (state, { product }) => {
    const existing = state.find((item) => item.product.id === product.id);
    if (existing) {
      return state.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...state, { product, quantity: 1 }];
  }),
  on(removeFromCart, (state, { productId }) =>
    state.filter((item) => item.product.id !== productId)
  ),
  on(updateQuantity, (state, { productId, quantity }) =>
    state.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    )
  )
);
