import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducers';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[];
  ingresosEgresosSubscription: Subscription;

  constructor(
    private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresosEgresosSubscription = this.store.select('ingresosEgresos')
      .subscribe((store) => this.ingresosEgresos = store.items);
  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubscription.unsubscribe();
  }

  onDelete(uid: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(value => Swal.fire('Borrado', 'Item borrado correctamente!', 'success'))
      .catch(err => Swal.fire('Error', err.message, 'error'));
  }

}
