import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ProductService } from './services/product.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { shoppingCartReducer } from './store/cart.reducer';
import { CartEffects } from './store/cart.effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ShoppingCartRoutingModule,
    StoreModule.forFeature('shoppingCart', shoppingCartReducer),
    EffectsModule.forFeature([CartEffects]),
  ],
  declarations: [],
  providers: [ProductService],
})
export class ShoppingCartModule {}
