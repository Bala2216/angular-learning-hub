import { createAction, props } from '@ngrx/store';
import { CombinedCard } from '../models/combined-card.model';

export const loadCombined = createAction('[Combined] Load All');
export const searchCombined = createAction(
  '[Combined] Search',
  props<{ term: string }>()
);
export const loadCombinedSuccess = createAction(
  '[Combined] Load Success',
  props<{ data: CombinedCard[] }>()
);
export const loadCombinedFailure = createAction(
  '[Combined] Load Failure',
  props<{ error: any }>()
);
