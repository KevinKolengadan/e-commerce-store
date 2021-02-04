import { Component } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from './state/app.state';
import {selectUser} from './state/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-commerce-store';
  user$ = this.store.pipe(select(selectUser));

  constructor(
    private store: Store<AppState>
  ) {}
}
