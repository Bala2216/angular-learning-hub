import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    console.log('Fetching products from:', this.apiUrl);
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap((products: Product[]) => console.log('Products received:', products)),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching products:', error);
        return throwError(() => error);
      })
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
