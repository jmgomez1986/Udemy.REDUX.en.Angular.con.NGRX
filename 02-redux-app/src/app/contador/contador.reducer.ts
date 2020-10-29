import { createReducer, on } from '@ngrx/store';
import { decrementar, dividir, incrementar, multiplicar, reset } from './contador.actions';

export const initialState = 20;

const _contadorReducer = createReducer(
  initialState,
  on(incrementar, (state) => state + 1),
  on(decrementar, (state) => state - 1),
  // on(multiplicar, (state, props) => state * props.numero),
  on(multiplicar, (state, {numero}) => state * numero),
  on(dividir, (state, {numero}) => state / numero),
  on(reset, (state) => state = 0),

);

export function contadorReducer(state, action) {
  return _contadorReducer(state, action);
}
