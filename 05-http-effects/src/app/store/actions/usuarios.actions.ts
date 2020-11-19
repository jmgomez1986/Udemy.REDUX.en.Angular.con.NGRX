import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';

export const cargarUsuarios = createAction('[Usuario] cargarUsuarios');

export const cargarUsuariosSuccess = createAction(
  '[Usuario] cargarUsuariosSuccess',
  props<{ usuarios: Usuario[] }>()
);

export const cargarUsuariosError = createAction(
  '[Usuario] cargarUsuariosError',
  props<{ payload: any }>()
);
