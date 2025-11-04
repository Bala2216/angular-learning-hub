// components/product-card.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-2"
    >
      <img
        [src]="product.image"
        alt="{{ product.name }}"
        class="w-24 h-24 object-cover rounded-md border"
      />
      <h3 class="text-lg font-semibold text-gray-800">{{ product.name }}</h3>
      <p class="text-sm text-gray-600">Category: {{ product.category }}</p>
      <button
        class="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        (click)="viewProductDetails()"
      >
        View Details
      </button>
    </div>
  `,
  styles: [
    `
      .card {
        border: 1px solid #ccc;
        padding: 1rem;
        margin: 0.5rem;
      }
    `,
  ],
})
export class ProductCardComponent {
  @Input() product: any;
  @Output() viewDetails = new EventEmitter<any>();

  viewProductDetails() {
    this.viewDetails.emit(this.product);
  }
}
