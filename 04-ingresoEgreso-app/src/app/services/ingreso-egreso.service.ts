import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private autService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso): Promise<DocumentReference> {
    const uidUser = this.autService.user.uid;

    delete ingresoEgreso.uid;
    return this.firestore.doc(`${uidUser}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  initIngresosEgresosListener(uid: string) {
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })
        ))
      );
  }

  borrarIngresoEgreso(uidItem: string) {
    const uidUser = this.autService.user.uid;
    return this.firestore.doc(`${uidUser}/ingresos-egresos/items/${uidItem}`).delete();
  }
}
