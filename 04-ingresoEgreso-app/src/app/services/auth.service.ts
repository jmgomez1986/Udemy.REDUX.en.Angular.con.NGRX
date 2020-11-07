import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  crearUsuario(nombre: string, correo: string, password: string) {
    console.log({nombre, correo, password});

    return firebase.auth().createUserWithEmailAndPassword(correo, password);
  }

  loginUsuario(correo: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(correo, password);
  }
}
