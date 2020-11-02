import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Todo } from '../models/todo.model';
import { toggle, toggleAll } from '../todo.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {
  // todos: Todo[];
  completado = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // this.store.select('todos').subscribe(todos => this.todos = todos);
  }

  onToggleAll() {
    // this.todos.forEach(element => {
    //   this.store.dispatch(toggle({ id: element.id }));
    // });
    this.completado = !this.completado;
    this.store.dispatch(toggleAll({completado: this.completado}));
  }

}
