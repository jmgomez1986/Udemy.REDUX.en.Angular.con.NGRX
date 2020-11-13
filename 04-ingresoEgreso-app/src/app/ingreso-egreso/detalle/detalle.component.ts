import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[];
  ingresosEgresosSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.ingresosEgresosSubscription = this.store.select('ingresoEgreso')
      .subscribe((store) => this.ingresosEgresos = store.items);
  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubscription.unsubscribe();
  }

  onDelete(uid: string) {
    console.log(uid);
  }

}
