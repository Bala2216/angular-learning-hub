import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts(): Observable<any[]> {
    const mockProducts = [
      {
        id: 1,
        name: 'Laptop',
        category: 'Electronics',
        description: 'High-performance laptop with 16GB RAM and 512GB SSD.',
        price: 89.99,
        rating: 4.5,
        image: 'assets/images/laptop.jpg',
      },
      {
        id: 2,
        name: 'Shoes',
        category: 'Fashion',
        description: 'Comfortable running shoes with breathable mesh.',
        price: 59.99,
        rating: 4.2,
        image: 'assets/images/shoes.jpg',
      },
      {
        id: 3,
        name: 'Watch',
        category: 'Accessories',
        description: 'Stylish analog watch with leather strap.',
        price: 129.99,
        rating: 4.7,
        image: 'assets/images/watch.jpg',
      },
      {
        id: 4,
        name: 'Phone',
        category: 'Accessories',
        description: 'Stylish Apple iPhone 17 Air',
        price: 200.99,
        rating: 4.5,
        image: 'assets/images/phone.jpg',
      },
      {
        id: 5,
        name: 'Soundbar',
        category: 'Electronics',
        description: 'Soundbar with Dolby Atmos support.',
        price: 100.99,
        rating: 4.1,
        image: 'assets/images/soundbar.jpg',
      },
      {
        id: 6,
        name: 'Television',
        category: 'Electronics',
        description: 'Stylish 4K Ultra HD Smart TV.',
        price: 95.99,
        rating: 4.7,
        image: 'assets/images/television.jpg',
      },
    ];

    return of(mockProducts).pipe(delay(1000));
  }
}
