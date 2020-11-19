import { Component,  OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { cargarUsuarios } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  usuarios: Array<Usuario> = [];
  subscriptions: Array<Subscription>;

  // constructor(private usuarioService: UsuarioService) { }
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    // this.usuarioService.getUsers()
    // .subscribe(response => {
    //   this.usuarios = response;
    //   console.log(this.usuarios);
    // });

    this.store.dispatch(cargarUsuarios());
  }

}
