import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {
  ingresos = 0;
  egresos = 0;
  totalIngresos = 0;
  totalEgresos = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('ingresoEgreso').subscribe(({items}) => this.generarEstadistica(items));
  }

  generarEstadistica(items: IngresoEgreso[]) {
    console.log(items);
    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos ++;
      }
      if (item.tipo === 'egreso') {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    }
  }

}
