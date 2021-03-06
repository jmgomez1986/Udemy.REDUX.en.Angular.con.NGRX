import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import { unsetItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription;
  private getterUser: Usuario;

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>) { }

    get user(): Usuario {
      return {...this.getterUser};
    }

  initAuthListener() {
    this.auth.authState.subscribe((fbUser) => {
      if (fbUser) {
        this.userSubscription = this.firestore.doc(`${fbUser.uid}/usuario`).valueChanges()
        .subscribe((firestoreUser: any) => {
          const user = Usuario.fromFirebase(firestoreUser);
          this.getterUser = user;
          this.store.dispatch(authActions.setUser({ user }));
        });
      } else {
        if (this.userSubscription) {
          this.userSubscription.unsubscribe();
        }
        this.getterUser = null;
        this.store.dispatch(authActions.unsetUser());
        this.store.dispatch(unsetItems());
      }
    });
  }

  crearUsuario(nombre: string, correo: string, password: string): Promise<any> {

    return firebase.auth().createUserWithEmailAndPassword(correo, password)
      .then(({ user }) => {
        const newUser = new Usuario(user.uid, nombre, user.email);

        return this.firestore.doc(`${user.uid}/usuario`)
          .set({ ...newUser });
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
