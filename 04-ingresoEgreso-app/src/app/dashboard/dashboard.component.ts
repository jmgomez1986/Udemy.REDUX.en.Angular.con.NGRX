import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  ingresosEgresosSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.userSubscription = this.store.select('user')
    .pipe(
      filter(auth => auth.user ? true : false)
    )
    .subscribe(({user}) => {
      console.log(user);
      this.ingresosEgresosSubscription = this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
        .subscribe(ingresosEgresosFB => {
          this.store.dispatch(setItems({items: ingresosEgresosFB}));
        });
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.ingresosEgresosSubscription.unsubscribe();
  }

}
