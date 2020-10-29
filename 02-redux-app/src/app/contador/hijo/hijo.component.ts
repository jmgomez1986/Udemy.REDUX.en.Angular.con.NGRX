import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

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
    // this.contador *= 2;
    // this.changeCount.emit(this.contador);
  }

  onDivide() {
    // this.contador /= 2;
    // this.changeCount.emit(this.contador);
  }

}
