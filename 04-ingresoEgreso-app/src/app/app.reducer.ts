import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducers';
import * as auth from './auth/auth.reducers';
// import * as ingresoEgreso from './ingreso-egreso/ingreso-egreso.reducers';

export interface AppState {
  ui: ui.State;
  user: auth.State;
  // ingresosEgresos: ingresoEgresos.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  // ingresosEgresos: ingresoEgresos.ingresosEgresosReducer,
};
