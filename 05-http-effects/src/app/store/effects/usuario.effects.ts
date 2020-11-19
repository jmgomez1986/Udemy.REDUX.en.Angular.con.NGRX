import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, pluck, tap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as usuariosActions from '../actions';

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(usuariosActions.cargarUsuario),
      mergeMap(
        (action) => this.usuarioService.getUserById(action.id)
        .pipe(
          pluck('data'),
          map(usuario => {
            console.log('Usuario para la accion: ', usuario);
            return usuariosActions.cargarUsuarioSuccess({usuario});
          }),
          catchError(err => of(usuariosActions.cargarUsuarioError({payload: err})))
        )
      )
    )
  );
}
