import { Component,  OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  usuarios: Array<Usuario>;
  subscriptions: Array<Subscription>;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usuarioService.getUsers()
    .pipe(
      map(response => response.data)
    )
    .subscribe(response => {
      this.usuarios = response;
      console.log(this.usuarios);
    });
  }

}
