import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import * as firebase from 'firebase';
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
      .add({...ingresoEgreso});
  }
}
