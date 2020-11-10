import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe ((fbIUser) => {
      if (fbIUser) {
        this.firestore.doc(`${fbIUser.uid}/usuario`).valueChanges()
          .subscribe(user => {
            const tmpUser = new Usuario(fbIUser.uid, 'Matias', fbIUser.email);
            this.store.dispatch(authActions.setUser({user: tmpUser}));
          });
      } else {

      }
    });
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
