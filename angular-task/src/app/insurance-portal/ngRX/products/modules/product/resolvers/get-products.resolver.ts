import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Product } from '../../../models/product.model';
import { GetProductsService } from '../../../services/get-products/get-products.service';


export const getProductsResolver: ResolveFn<Array<Product>> = (route, state) => {
  return inject(GetProductsService).execute();
};
