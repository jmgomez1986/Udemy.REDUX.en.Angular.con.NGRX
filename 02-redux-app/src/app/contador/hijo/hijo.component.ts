import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.scss']
})
export class HijoComponent implements OnInit {
  @Input() contador: number;
  @Output() changeCount = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onMultiply() {
    this.contador *= 2;
    this.changeCount.emit(this.contador);
  }

  onDivide() {
    this.contador /= 2;
    this.changeCount.emit(this.contador);
  }

  resetCount(count: number) {
    this.contador = count;
    this.changeCount.emit(this.contador);
  }

}
