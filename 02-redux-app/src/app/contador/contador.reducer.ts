import { Action } from '@ngrx/store';
import { decrementar, incrementar } from './contador.actions';

export function contadorReducer(state = 10, action: Action) {

  switch (action.type) {
    case incrementar.type:
      return state + 1;
    case decrementar.type:
      return state - 1;
    // case 'MULTIPLICAR':
    //   return state * action.payload;
    // case 'DIVIDIR':
    //   return state / action.payload;
    // case 'RESET':
    //   return state = 0;
    default:
      return state;
  }
}
