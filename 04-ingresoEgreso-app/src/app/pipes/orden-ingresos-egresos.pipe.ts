import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresosEgresos'
})
export class OrdenIngresosEgresosPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    const ingresosEgresos = [ ...items ]; // Hay que usar desestructuracion porque el sort esta mutando el arreglo y NgRx no lo permite

    return ingresosEgresos.sort((a, b) => {
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
