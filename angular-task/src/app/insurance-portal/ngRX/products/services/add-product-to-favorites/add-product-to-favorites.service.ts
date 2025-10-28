import { Inject, Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/favorite-product/app.state';
import { FavoriteProduct } from '../../models/favorite-product.model';
import { add } from '../../states/favorite-product/action/app.action';

@Injectable({
  providedIn: 'root',
})
export class AddProductToFavoritesService {
  constructor(
    private storageService: StorageService<FavoriteProduct[]>,
    private store: Store<AppState>
  ) {}

  execute(product: FavoriteProduct) {
    const favoritesProducts = <FavoriteProduct[]>(
      this.storageService.get('favoritesProduct')
    );

    if (favoritesProducts) {
      favoritesProducts.push(product);
      this.storageService.add('favoritesProduct', favoritesProducts);
    } else {
      this.storageService.add('favoritesProduct', [product]);
    }

    this.store.dispatch(add({ product }));
  }
}
