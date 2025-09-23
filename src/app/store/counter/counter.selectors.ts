import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectCounterState = createFeatureSelector<number>('count');

export const selectCount = createSelector(
  selectCounterState,
  (state) => state
);
