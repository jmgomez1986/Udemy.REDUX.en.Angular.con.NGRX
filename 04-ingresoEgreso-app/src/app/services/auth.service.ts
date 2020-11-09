import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  initAuthListener(): Observable<firebase.User> {
    return this.auth.authState;
  }

  crearUsuario(nombre: string, correo: string, password: string): Promise<firebase.auth.UserCredential> {
    console.log({nombre, correo, password});

    return firebase.auth().createUserWithEmailAndPassword(correo, password);
  }

  loginUsuario(correo: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(correo, password);
  }

  logout(): Promise<void> {
    return firebase.auth().signOut();
  }
}
