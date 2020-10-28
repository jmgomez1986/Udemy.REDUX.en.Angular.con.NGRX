import { createStore, Store } from 'redux';
import { decrementadorAction, incementadorAction } from './contador/contador.actions';
import { contadorReducer } from './contador/contador.reducer';

const store: Store = createStore(contadorReducer);

store.subscribe( () => {
	console.log('Store: ', store.getState());
});

store.dispatch(incementadorAction);
store.dispatch(decrementadorAction);