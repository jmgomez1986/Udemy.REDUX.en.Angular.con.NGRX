import { createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import * as ingresoEgresoActions from './ingreso-egreso.actions';
export interface State {
    items: IngresoEgreso[];
}
export interface AppStateWithIngreso extends AppState {
  ingresosEgresos: State;
}

export const initialState: State = {
  items: [],
};

const _ingresoEgresoReducer = createReducer(initialState,

    on(ingresoEgresoActions.setItems  , (state, {items}) => ({ ...state, items: [...items]})),
    on(ingresoEgresoActions.unsetItems, (state) => ({ ...state, items: []})),

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}
