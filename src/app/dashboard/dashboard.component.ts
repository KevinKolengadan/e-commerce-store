import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import {select, Store} from '@ngrx/store';
import {selectCart, selectProducts, selectUser} from '../state/app.selectors';
import {AppState} from '../state/app.state';
import {Product} from '../model/product.model';
import {map, mergeMap, take} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
import {addProduct, removeProduct} from '../state/products.actions';
import {ProductService} from '../services/product.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  product$ = this.store.pipe(select(selectProducts));
  cart$ = this.store.pipe(select(selectCart));
  user$ = this.store.pipe(select(selectUser));
  loading = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    private productService: ProductService
  ) {}

  getQuantityDetails(product: Product): Observable<number> {
    return this.cart$.pipe(map(cart => {
      const selectedProduct = cart?.products?.filter( p => p.productId === product.id);
      if (selectedProduct && selectedProduct.length > 0) {
        return selectedProduct[0].quantity;
      }
      return 0;
    }));
  }

  removeFromCart(product: Product): void {
    this.store.dispatch(removeProduct(product));
    this.updateCart();
  }
  addToCart(product: Product): void {
    this.store.dispatch(addProduct(product));
    this.updateCart();
  }

  updateCart(): void {
    this.loading = true;
    /**
     * forkJoin requires that the observable that is being forked also completes.
     * In the case of @ngrx, all of their observables are usually based on a BehaviorSubject, and will never complete
     * So use take(1) to trigger the completion
     */
    forkJoin([
      this.user$.pipe(take(1)),
      this.cart$.pipe(take(1))
    ]).pipe( mergeMap(result => {
        const user = result[0];
        const cart = result[1];
        return this.productService.updateCart(user.id ? user.id : 0, cart);
      })
    ).subscribe(() => {
      this.loading = false;
    });
  }


}
