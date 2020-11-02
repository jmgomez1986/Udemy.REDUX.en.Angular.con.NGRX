import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrosValidos, setFilter } from 'src/app/filtro/filtro.actions';
import { limpiarFiltro } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {
  filtroActual: filtrosValidos;
  filtros: filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  pendientes = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    });
  }

  onChangeFilter(filtro: filtrosValidos) {
    this.store.dispatch(setFilter({filtro}));
  }

  onLimpiarCompletados() {
    this.store.dispatch(limpiarFiltro());
  }

}
