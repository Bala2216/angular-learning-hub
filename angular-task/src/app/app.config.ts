import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { userReducer } from './ngRX2/store/user.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { employeeReducer } from './insurance-portal/ngRX/store/employee.reducer';
import { counterReducer } from './insurance-portal/ngRX/counter/store/counter.reducer';
import { employeeReducer1 } from './insurance-portal/JSONForms-Employee/store/employee.reducer';
import { favoriteReducer } from './insurance-portal/ngRX/products/states/favorite-product/reducer/app.reducer';
import { productReducer } from './product-dashboard/store/product.reducer';
import { ProductEffects } from './product-dashboard/store/product.effects';
import { cartReducer } from './product-dashboard/store/cart/cart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideStore({
      userState: userReducer,
      employees: employeeReducer,
      counter: counterReducer,
      employees1: employeeReducer1,
      favorite: favoriteReducer,
      products: productReducer,
      cart: cartReducer,
    }),
    provideEffects(ProductEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
};
