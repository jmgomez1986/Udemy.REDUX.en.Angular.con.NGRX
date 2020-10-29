import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { dividir, multiplicar } from '../contador.actions';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.scss']
})
export class HijoComponent implements OnInit {
  contador: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('contador').subscribe( contador => this.contador = contador);
  }

  onMultiply() {
    this.store.dispatch(multiplicar({numero: 2}));
  }

  onDivide() {
    this.store.dispatch(dividir({numero: 2}));
  }

}
