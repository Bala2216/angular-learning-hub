import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CombinedState } from './combined.reducer';

export const selectCombinedState =
  createFeatureSelector<CombinedState>('combined');

export const selectCombinedData = createSelector(
  selectCombinedState,
  (state) => state.data
);

export const selectLoading = createSelector(
  selectCombinedState,
  (state) => state.loading
);
