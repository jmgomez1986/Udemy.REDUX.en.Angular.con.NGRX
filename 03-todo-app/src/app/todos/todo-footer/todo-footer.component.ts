import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrosValidos, setFilter } from 'src/app/filtro/filtro.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {
  filtroActual: filtrosValidos;
  filtros: filtrosValidos[] = ['todos', 'completados', 'pendientes'];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('filtro').subscribe(filtro => this.filtroActual = filtro);
  }

  onChangeFilter(filtro: filtrosValidos) {
    this.store.dispatch(setFilter({filtro}));
  }

}
