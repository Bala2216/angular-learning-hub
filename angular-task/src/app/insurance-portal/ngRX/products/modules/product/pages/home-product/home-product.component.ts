import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, HostListener, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../../../../states/favorite-product/app.state';
import { FavoriteProduct } from '../../../../models/favorite-product.model';
import { Product } from '../../../../models/product.model';
import { AddProductToFavoritesService } from '../../../../services/add-product-to-favorites/add-product-to-favorites.service';
import { RemoveProductToFavoritesService } from '../../../../services/remove-product-to-favorites/remove-product-to-favorites.service';
import { RecoveryProductsToFavoritesService } from '../../../../services/recovery-products-to-favorites/recovery-products-to-favorites.service';
import { selectProducts } from '../../../../states/favorite-product/selector/app.selector';
import { GridList } from '../../../../commons/grid-list.class';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-home-product',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.scss'],
})
export class HomeProductComponent extends GridList<Product> implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store<AppState>);
  private readonly addProductToFavoritesService = inject(
    AddProductToFavoritesService
  );
  private readonly removeProductToFavoritesService = inject(
    RemoveProductToFavoritesService
  );
  private readonly recoveryProductToFavoritesService = inject(
    RecoveryProductsToFavoritesService
  );

  override rowHeight: string = '320px';
  override colsDesktop: number = this.getNumberOfColumns();
  favoriteProductsObs: Observable<Array<FavoriteProduct>> = this.store.pipe(
    select(selectProducts)
  );

  constructor(breakpointObserver: BreakpointObserver) {
    super(breakpointObserver);
  }

  @HostListener('window:resize', ['$event'])
  onResize(__: any) {
    this.colsDesktop = this.getNumberOfColumns();
  }

  ngOnInit() {
    this.initResolvers();
    this.updateStorageToStateFavoriteProducts();
  }

  addProductToFavorites(product: Product) {
    const favoriteProduct: FavoriteProduct = {
      ...product,
      isFavorite: true,
    };
    this.addProductToFavoritesService.execute(favoriteProduct);
  }

  removeProductToFavorites(product: Product) {
    const favoriteProduct: FavoriteProduct = {
      ...product,
      isFavorite: false,
    };
    this.removeProductToFavoritesService.execute(favoriteProduct);
  }

  private initResolvers() {
    this.activatedRoute.data.subscribe(({ products }) => {
      this.initStateFavoriteProduct(products);
    });
  }

  private updateStorageToStateFavoriteProducts() {
    this.recoveryProductToFavoritesService.execute();
  }

  private initStateFavoriteProduct(products: Product[]) {
    this.favoriteProductsObs
      .pipe(
        map((favoriteProducts) => this.mapProducts(products, favoriteProducts))
      )
      .subscribe((favotireProducts) => {
        this.data = favotireProducts;
      });
  }

  private mapProducts(
    products: Product[],
    favotireProducts: FavoriteProduct[]
  ): FavoriteProduct[] {
    return products.map((product) => {
      const favoriteFound = favotireProducts.find((f) => f.id === product.id);
      return favoriteFound
        ? { ...product, isFavorite: true }
        : { ...product, isFavorite: false };
    });
  }
}
