import { createReducer, on } from '@ngrx/store';
import {
  loadUsersSuccess,
  loadPhotosSuccess,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from './user.actions';
import { User, Photo } from '../services/user.service';

export interface UserState {
  users: User[];
  photos: Photo[];
}

export const initialState: UserState = {
  users: [],
  photos: [],
};

export interface CartItem {
  user: User;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = {
  items: [],
};

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(loadPhotosSuccess, (state, { photos }) => ({ ...state, photos }))
);

export const cartReducer = createReducer(
  initialCartState,
  on(addToCart, (state, { user }) => {
    const existing = state.items.find(item => item.user.id === user.id);
    if (existing) {
      return {
        ...state,
        items: state.items.map(item =>
          item.user.id === user.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    } else {
      return {
        ...state,
        items: [...state.items, { user, quantity: 1 }]
      };
    }
  }),
  on(incrementQuantity, (state, { userId }) => ({
    ...state,
    items: state.items.map(item =>
      item.user.id === userId ? { ...item, quantity: item.quantity + 1 } : item
    )
  })),
  on(decrementQuantity, (state, { userId }) => ({
    ...state,
    items: state.items
      .map(item =>
        item.user.id === userId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0)
  })),
  on(removeFromCart, (state, { userId }) => ({
    ...state,
    items: state.items.filter(item => item.user.id !== userId)
  }))
);

