import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore) { }

  initAuthListener(): Observable<firebase.User> {
    return this.auth.authState;
  }

  crearUsuario(nombre: string, correo: string, password: string): Promise<any> {
    console.log({nombre, correo, password});

    return firebase.auth().createUserWithEmailAndPassword(correo, password)
      .then(({user}) => {
        const newUser = new Usuario(user.uid, nombre, user.email);

        return this.firestore.doc(`${user.uid}/usuario`)
          .set({...newUser});
      });
  }

  loginUsuario(correo: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(correo, password);
  }

  logout(): Promise<void> {
    return firebase.auth().signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }
}
