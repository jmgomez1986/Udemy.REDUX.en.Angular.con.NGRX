import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;

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
      this.ingresoEgresoService.initIngresosEgresosListener(user.uid);
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
