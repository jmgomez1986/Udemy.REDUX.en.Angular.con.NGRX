import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  id: number;
  user: Usuario;
  loading = false;
  error: any;
  subscriptions: Array<Subscription>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('usuario')
      .subscribe(({user, loading, error}) => {
        this.user = user;
        this.loading = loading;
        this.error = error;
      });

    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.store.dispatch(cargarUsuario({id: this.id}));
    });
  }

}
