import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { GridList } from '../../../../commons/grid-list.class';
import { FavoriteProduct } from '../../../../models/favorite-product.model';

import { RemoveProductToFavoritesService } from '../../../../services/remove-product-to-favorites/remove-product-to-favorites.service';
import { GetProductsToFavoritesService } from '../../../../services/get-products-to-favorites/get-products-to-favorites.service';
import { ClearProductsToFavoritesService } from '../../../../services/clear-products-to-favorites/clear-products-to-favorites.service'; 
import { CommonModule } from '@angular/common';
import { HeaderFavoriteProductComponent } from '../../components/header-favorite-product/header-favorite-product.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-home-favorite-product',
  standalone: true,
  imports: [
    CommonModule,
    HeaderFavoriteProductComponent,
    SharedModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './home-favorite-product.component.html',
  styleUrls: ['./home-favorite-product.component.scss'],
})
export class HomeFavoriteProductComponent
  extends GridList<FavoriteProduct>
  implements OnInit
{
  override rowHeight: string = '320px';

  constructor(
    private readonly removeProductToFavoritesService: RemoveProductToFavoritesService,
    private readonly getProductToFavoritesService: GetProductsToFavoritesService,
    private readonly clearProductToFavoritesService: ClearProductsToFavoritesService,
    breakpointObserver: BreakpointObserver
  ) {
    super(breakpointObserver);
  }

  @HostListener('window:resize', ['$event'])
  onResize(__: any) {
    this.colsDesktop = this.getNumberOfColumns();
  }

  ngOnInit() {
    this.initFavoritesProducts();
  }

  removeProductFavorites(product: FavoriteProduct) {
    this.removeProductToFavoritesService.execute(product);
    this.initFavoritesProducts();
  }

  clearFavoriteList() {
    this.clearProductToFavoritesService.execute();
    this.initFavoritesProducts();
  }

  private initFavoritesProducts() {
    this.data = this.getProductToFavoritesService.execute();
  }
}
