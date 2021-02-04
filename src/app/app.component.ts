import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from './state/app.state';
import {selectCart, selectProductFilter, selectUser} from './state/app.selectors';
import {UserService} from './services/user.service';
import {retrieveUserDetails} from './state/user.actions';
import {BreakpointObserver} from '@angular/cdk/layout';
import {forkJoin} from 'rxjs';
import {ProductService} from './services/product.service';
import {retrieveCartList, retrieveProductsList, updateProductFilter} from './state/products.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'e-commerce-store';
  user$ = this.store.pipe(select(selectUser));
  cart$ = this.store.pipe(select(selectCart));
  searchProduct$ = this.store.pipe(select(selectProductFilter));
  searchProduct: string;
  hideMenu = true;
  isLoaded = false;
  userId = 1;

  constructor(
    private store: Store<AppState>,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private productService: ProductService
  ) {
    const layoutChanges = breakpointObserver.observe([
      '(min-width: 600px)', // switch the layout to mobile when the width is less than 600px
    ]);
    layoutChanges.subscribe(result => {
      this.hideMenu = !result.matches;
    });
    this.searchProduct$.subscribe(value => this.searchProduct = value);
  }

  updateValue(): void {
    this.store.dispatch(updateProductFilter({productFilter: this.searchProduct}));
  }

  ngOnInit(): void {
    // fetch user, product and cart details in the beginning
    forkJoin([
      this.userService.getUser(this.userId),
      this.productService.getProducts(),
      this.productService.getCart(this.userId)
    ]).subscribe(result => {
      this.store.dispatch(retrieveUserDetails(result[0]));
      this.store.dispatch(retrieveProductsList({products: result[1]}));
      this.store.dispatch(retrieveCartList(result[2]));
      this.isLoaded = true;
    });
  }
}
