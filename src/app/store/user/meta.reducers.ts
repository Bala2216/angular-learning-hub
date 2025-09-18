import { ActionReducer, MetaReducer } from '@ngrx/store';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const nextState = reducer(state, action);
    localStorage.setItem('userState', JSON.stringify(nextState.users));
    return nextState;
  };
}

export const metaReducers: MetaReducer[] = [localStorageSyncReducer];
