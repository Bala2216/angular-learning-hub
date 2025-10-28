import { Component, inject } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../states/favorite-product/app.state';
import { FavoriteProduct } from '../../models/favorite-product.model';
import { selectProducts } from '../../states/favorite-product/selector/app.selector';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private router = inject(Router);
  private store = inject(Store<AppState>);

  title!: string;
  favoritesProducts: Observable<Array<FavoriteProduct>> = this.store.pipe(
    select(selectProducts)
  );

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setTitleFromRoute(this.router.routerState.snapshot.root);
      }
    });
  }

  setTitleFromRoute(route: ActivatedRouteSnapshot) {
    if (route.firstChild) {
      this.setTitleFromRoute(route.firstChild);
    } else {
      this.title = route.data['title'];
    }
  }

  redirectToHomeFavoritesProductsPage() {
    this.router.navigate(['/favorites']);
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }
}
