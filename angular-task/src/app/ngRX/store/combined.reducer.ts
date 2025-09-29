import { createReducer, on } from '@ngrx/store';
import { CombinedCard } from '../models/combined-card.model';
import * as CombinedActions from './combined.actions';

export interface CombinedState {
  data: CombinedCard[];
  loading: boolean;
  error: any;
}

export const initialState: CombinedState = {
  data: [],
  loading: false,
  error: null,
};

export const combinedReducer = createReducer(
  initialState,
  on(CombinedActions.loadCombined, CombinedActions.searchCombined, (state) => ({
    ...state,
    loading: true,
  })),
  on(CombinedActions.loadCombinedSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
  })),
  on(CombinedActions.loadCombinedFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
