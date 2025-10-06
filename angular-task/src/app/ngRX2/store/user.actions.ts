import { createAction, props } from '@ngrx/store';
import { User, Photo } from '../services/user.service';

export const loadUsers = createAction('Load Users');
export const loadUsersSuccess = createAction(
  'Load Users Success',
  props<{ users: User[] }>()
);
export const loadPhotosSuccess = createAction(
  'Load Photos Success',
  props<{ photos: Photo[] }>()
);

export const addToCart = createAction(
  'Add To Cart',
  props<{ user: User }>()
);

export const removeFromCart = createAction(
  'Remove From Cart', 
  props<{ userId: number }>()
);

export const incrementQuantity = createAction(
  'Increment Quantity',
  props<{ userId: number }>()
);

export const decrementQuantity = createAction(
  'Decrement Quantity',
  props<{ userId: number }>()
);

