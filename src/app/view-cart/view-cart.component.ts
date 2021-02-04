import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import {select, Store} from '@ngrx/store';
import {selectCart, selectProducts, selectUser} from '../state/app.selectors';
import {AppState} from '../state/app.state';
import {Product} from '../model/product.model';
import {map, take} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
import {removeProduct} from '../state/products.actions';
import {ProductService} from '../services/product.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent {

  product$ = this.store.pipe(select(selectProducts));
  cart$ = this.store.pipe(select(selectCart));
  user$ = this.store.pipe(select(selectUser));
  loading = false;
  displayedColumns: string[] = ['image', 'title', 'category', 'quantity', 'price', 'removeFromCart'];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    private productService: ProductService
  ) {
  }

  getProductDetails(): Observable<MatTableDataSource<{quantity: number, product: Product}>> {
    return forkJoin([
      this.product$.pipe(take(1)),
      this.cart$.pipe(take(1))
    ]).pipe(map(result => {
      const products = result[0];
      const cart = result[1];
      return new MatTableDataSource<{quantity: number, product: Product}>(cart.products ? cart.products.map(cartProduct => {
        return {
          quantity: cartProduct.quantity,
          product: products.filter(product => product.id === cartProduct.productId)?.[0]
        };
      }) : []);
    }));
  }

  removeFromCart(product: Product): void {
    this.store.dispatch(removeProduct(product));
    this.updateCart();
  }

  updateCart(): void {
    this.loading = true;
    this.user$.pipe(take(1)).subscribe(user => {
      this.cart$.pipe(take(1)).subscribe(cart => {
        this.productService.updateCart(user.id ? user.id : 0, cart).subscribe(() => {
          this.loading = false;
        });
      });
    });
  }


}
