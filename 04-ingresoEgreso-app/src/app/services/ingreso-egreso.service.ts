import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import * as firebase from 'firebase';
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
    return this.firestore.doc(`${this.autService.user.uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  initIngresosEgresosListener(uid: string) {
    this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })
        ))
      )
      .subscribe(value => {
        console.log(value);
      });
  }
}
