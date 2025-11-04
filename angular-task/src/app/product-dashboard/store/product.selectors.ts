import { createFeatureSelector } from '@ngrx/store';

export const selectProducts = createFeatureSelector<any[]>('products');
