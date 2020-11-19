import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, pluck, tap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as usuariosActions from '../actions';
@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) { }

  cargarUsuarios$ = createEffect(
    () => this.actions$.pipe(
      ofType(usuariosActions.cargarUsuarios),
      tap(data => console.log('effect: ', data)),
      mergeMap(
        () => this.usuarioService.getUsers()
          .pipe(
            tap(data => console.log('getUsers effect: ', data)),
            pluck('data'),
            map(usuarios => usuariosActions.cargarUsuariosSuccess({ usuarios })),
            // map(response => usuariosActions.cargarUsuariosSuccess({usuarios: response.data})),
            catchError(err => of(usuariosActions.cargarUsuariosError({ payload: err })))
          )
      )
    )
  );
}
