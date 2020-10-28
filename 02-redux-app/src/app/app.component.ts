import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './contador/contador.actions';

interface AppState {
  contador: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contador: number;

  constructor(private store: Store<AppState>) {
    this.store.subscribe( (state) => {
      console.log('State: ', state);
      this.contador = state.contador;
    });
  }

  onIncrement() {
    this.store.dispatch(actions.incrementar());
  }

  onDecrease() {
    this.store.dispatch(actions.decrementar());
  }


}