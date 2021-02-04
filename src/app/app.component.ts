import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from './state/app.state';
import {selectUser} from './state/app.selectors';
import {User} from './model/user.model';
import {UserService} from './services/user.service';
import {retrieveUserDetails} from './state/user.actions';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'e-commerce-store';
  user$ = this.store.pipe(select(selectUser));
  hideMenu = true;

  constructor(
    private store: Store<AppState>,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService
  ) {
    const layoutChanges = breakpointObserver.observe([
      '(min-width: 600px)',
    ]);
    layoutChanges.subscribe(result => {
      this.hideMenu = !result.matches;
    });
  }

  ngOnInit(): void {
    this.userService.getUser(1).subscribe((user: User) => {
      this.store.dispatch(retrieveUserDetails(user));
    });
  }
}
