import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contador: number;

  constructor() {
    this.contador = 10;
  }

  onIncrement() {
    this.contador += 1;
  }

  onDecrease() {
    this.contador -= 1;
  }

  changeCount(count: number) {
    this.contador = count;
  }
}
