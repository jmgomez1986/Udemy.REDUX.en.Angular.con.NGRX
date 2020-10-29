import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import * as actions from './contador/contador.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contador: number;

  constructor(private store: Store<AppState>) {
    this.store.select('contador').subscribe( contador => this.contador = contador);
  }

  onIncrement() {
    this.store.dispatch(actions.incrementar());
  }

  onDecrease() {
    this.store.dispatch(actions.decrementar());
  }


}
