import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styleUrls: ['./nieto.component.scss']
})
export class NietoComponent implements OnInit {
  @Input() contador: number;
  @Output() resetCount = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onReset() {
    this.contador = 0;
    this.resetCount.emit(this.contador);
  }

}
