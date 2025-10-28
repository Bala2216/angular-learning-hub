import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header-favorite-product',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './header-favorite-product.component.html',
  styleUrls: ['./header-favorite-product.component.scss']
})
export class HeaderFavoriteProductComponent {

  @Output()
  clickClearEvent:EventEmitter<any> = new EventEmitter<any>();


  clearEvent() {
    this.clickClearEvent.emit()
  }
}
