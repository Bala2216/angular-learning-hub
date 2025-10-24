import { createReducer, on } from "@ngrx/store";
import { CounterState } from "../model/counter.model";
import { decrement, increment, reset } from "./counter.actions";

export const intialState: CounterState  = { count: 0};

export const counterReducer = createReducer(
    intialState, 
    on(increment, (state)=>({...state, count: state.count + 1})),
    on(decrement, (state)=> ({...state, count: state.count - 1})),
    on(reset, (state)=> ({...state, count: 0}))
);