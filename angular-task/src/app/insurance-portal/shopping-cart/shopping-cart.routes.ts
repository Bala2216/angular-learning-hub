import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CartEffects } from './store/cart.effects';
import { shoppingCartReducer } from './store/cart.reducer';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

export const SHOPPING_CART_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideState({ name: 'shoppingCart', reducer: shoppingCartReducer }),
      provideEffects(CartEffects),
    ],
    children: [
      { path: '', component: ProductListComponent },
      { path: 'cart', component: ShoppingCartComponent },
    ],
  },
];
