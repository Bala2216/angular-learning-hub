import { createReducer, on } from '@ngrx/store';
import { loadProducts, loadProductsSuccess } from './product.actions';

export const initialState: any[] = [];

export const productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, action) => action.products)
  // on(loadProductsSuccess, (_, { products }) => products)
);
