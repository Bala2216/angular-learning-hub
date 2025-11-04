import { Component, computed, effect, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProducts } from '../store/product.selectors';
import { loadProducts } from '../store/product.actions';
import { ProductCardComponent } from './product-card.component';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from '../store/cart/cart.actions';
import {
  selectCart,
  selectCartCount,
  selectCartTotal,
} from '../store/cart/cart.selectors';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FormsModule],
  template: `<h2>Product Dashboard</h2>
    <!-- View Cart Button -->
    <button
      class="fixed top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
      (click)="toggleCart()"
    >
      🛒 View Cart
      <span
        *ngIf="cartCount() > 0"
        class="bg-white text-indigo-600 font-bold px-2 py-1 rounded-full text-sm"
      >
        {{ cartCount() }}
      </span>
    </button>

    <!-- Filter Input -->
    <input
      type="text"
      placeholder="Filter by category"
      (input)="onFilter($event)"
      class="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <!-- Product Grid -->
    <div *ngIf="filteredProducts().length > 0; else noData">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <app-product-card
          *ngFor="let product of filteredProducts()"
          [product]="product"
          (viewDetails)="onSelectProduct($event)"
        />
      </div>
    </div>
    <ng-template #noData><p>No products found.</p></ng-template>

    <!-- Modal -->
    <div
      *ngIf="showModal()"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          (click)="closeModal()"
        >
          ✕
        </button>
        <img
          [src]="selectedProduct()?.image"
          alt="{{ selectedProduct()?.name }}"
          class="w-full h-48 object-cover rounded mb-4"
        />
        <h2 class="text-xl font-bold mb-2">{{ selectedProduct()?.name }}</h2>
        <p class="text-gray-600 mb-2">
          Category: {{ selectedProduct()?.category }}
        </p>
        <p class="text-gray-700 mb-2">{{ selectedProduct()?.description }}</p>
        <p class="text-gray-800 font-semibold mb-2">
          Price: ₹{{ selectedProduct()?.price }}
        </p>
        <p class="text-yellow-500 mb-4">
          Rating: ⭐ {{ selectedProduct()?.rating }}
        </p>
        <button
          class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          (click)="buyProduct(selectedProduct())"
        >
          Buy Now
        </button>
      </div>
    </div>

    <!-- Cart Modal -->
    <div
      *ngIf="showCart()"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-4 sm:mx-auto overflow-y-auto max-h-[90vh]"
      >
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">🛒 Your Cart</h2>
          <button
            (click)="toggleCart()"
            class="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        <!-- Cart Items -->
        <div *ngIf="cartItems().length > 0; else emptyCart">
          <div
            *ngFor="let item of cartItems()"
            class="flex items-center justify-between gap-4 py-3 border-b"
          >
            <img
              [src]="item.product.image"
              class="w-16 h-16 object-cover rounded"
            />
            <div class="flex-1">
              <h3 class="font-semibold">{{ item.product.name }}</h3>
              <p class="text-sm text-gray-500">₹{{ item.product.price }}</p>
              <div class="flex items-center gap-2 mt-2">
                <button
                  (click)="updateQty(item.product.id, item.quantity - 1)"
                  class="px-2 bg-gray-200 rounded"
                >
                  −
                </button>
                <span>{{ item.quantity }}</span>
                <button
                  (click)="updateQty(item.product.id, item.quantity + 1)"
                  class="px-2 bg-gray-200 rounded"
                >
                  +
                </button>
                <button
                  (click)="remove(item.product.id)"
                  class="ml-auto text-red-500"
                >
                  🗑
                </button>
              </div>
            </div>
          </div>

          <!-- Checkout Form -->
          <form
            (ngSubmit)="submitCheckout()"
            #checkoutForm="ngForm"
            class="mt-6 space-y-4"
          >
            <input
              type="text"
              name="name"
              [(ngModel)]="checkoutData.name"
              placeholder="Your Name"
              required
              class="w-full px-4 py-2 border rounded"
            />
            <input
              type="email"
              name="email"
              [(ngModel)]="checkoutData.email"
              placeholder="Email Address"
              required
              class="w-full px-4 py-2 border rounded"
            />
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Confirm Checkout
            </button>
          </form>
        </div>

        <!-- Empty Cart Message -->
        <ng-template #emptyCart>
          <p class="text-center text-gray-500">Your cart is empty.</p>
        </ng-template>
      </div>
    </div>

    <div
      *ngIf="toastMessage()"
      class="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in"
    >
      {{ toastMessage() }}
    </div>
    <!-- <form
      (ngSubmit)="submitCheckout()"
      #checkoutForm="ngForm"
      class="mt-4 space-y-2"
    >
      <input
        type="text"
        name="name"
        [(ngModel)]="checkoutData.name"
        placeholder="Your Name"
        required
        class="w-full px-3 py-2 border rounded"
      />
      <input
        type="email"
        name="email"
        [(ngModel)]="checkoutData.email"
        placeholder="Email Address"
        required
        class="w-full px-3 py-2 border rounded"
      />
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Confirm Checkout
      </button>
    </form>  --> `,
})
export class DashboardComponent {
  products = signal<any[]>([]);
  filter = signal('');
  loading = signal(true);
  filteredProducts = computed(() =>
    this.products().filter((p) =>
      p.category.toLowerCase().includes(this.filter().trim().toLowerCase())
    )
  );

  selectedProduct = signal<any | null>(null);
  showModal = computed(() => this.selectedProduct() !== null);

  showCart = signal(false);
  private store = inject(Store);

  toastMessage = signal<string | null>(null);
  checkoutData = { name: '', email: '' };

  constructor() {
    effect(
      () => {
        this.store.select(selectProducts).subscribe((data) => {
          console.log('Products from store:', data);
          this.products.set(data);
          this.loading.set(false);
        });
      },
      { allowSignalWrites: true }
    );
    this.store.dispatch(loadProducts());
  }

  cartItems = toSignal(this.store.select(selectCart), { initialValue: [] });
  cartTotal = toSignal(this.store.select(selectCartTotal), { initialValue: 0 });

  cartCount = toSignal(this.store.select(selectCartCount), { initialValue: 0 });

  onFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filter.set(input.value);
  }

  onSelectProduct(product: any) {
    this.selectedProduct.set(product);
  }

  closeModal() {
    this.selectedProduct.set(null);
  }

  buyProduct(product: any) {
    this.store.dispatch(addToCart({ product }));
    this.showToast(`${product.name} added to cart`);
    this.closeModal();
  }

  toggleCart() {
    this.showCart.update((v) => !v);
  }

  remove(productId: number) {
    this.store.dispatch(removeFromCart({ productId }));
  }

  updateQty(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.remove(productId);
    } else {
      this.store.dispatch(updateQuantity({ productId, quantity }));
    }
  }

  checkout() {
    alert(`Checkout complete! Total: ₹${this.cartTotal()}`);
    this.toggleCart();
  }

  showToast(message: string) {
    this.toastMessage.set(message);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }

  submitCheckout() {
    if (this.cartItems().length === 0) return;
    alert(`Thank you, ${this.checkoutData.name}! Your order has been placed.`);
    this.store.dispatch({ type: '[Cart] Clear' });
    this.toggleCart();
  }
}
