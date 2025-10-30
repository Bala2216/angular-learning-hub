import { createReducer, on } from '@ngrx/store';
import { CartItem, Product } from '../models/product.model';
import * as CartActions from './cart.actions';

export interface CartState {
  products: Product[];
  cartItems: CartItem[];
  error: any;
  loading: boolean;
}

export const initialState: CartState = {
  products: [],
  cartItems: [],
  error: null,
  loading: false,
};

export const shoppingCartReducer = createReducer(
  initialState,

  on(CartActions.loadProducts, (state) => ({
    ...state,
    loading: true,
  })),

  on(CartActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),

  on(CartActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(CartActions.addToCart, (state, { product }) => {
    const existingItem = state.cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        ),
      };
    }

    return {
      ...state,
      cartItems: [...state.cartItems, { ...product, cartQuantity: 1 }],
    };
  }),

  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    cartItems: state.cartItems.filter((item) => item.id !== productId),
  })),

  on(CartActions.updateCartItemQuantity, (state, { productId, quantity }) => ({
    ...state,
    cartItems: state.cartItems.map((item) =>
      item.id === productId ? { ...item, cartQuantity: quantity } : item
    ),
  })),

  on(CartActions.clearCart, (state) => ({
    ...state,
    cartItems: [],
  }))
);
