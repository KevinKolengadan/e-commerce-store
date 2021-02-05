import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import {select, Store} from '@ngrx/store';
import {selectCart, selectProductFilter, selectProducts, selectUser} from '../state/app.selectors';
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
  searchProduct$ = this.store.pipe(select(selectProductFilter));
  searchProduct: string;
  loading = false;
  selectedCategories = new FormControl([]);
  sortBy = new FormControl('id');
  sortOrder = new FormControl('asc');

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    private productService: ProductService
  ) {
    this.searchProduct$.subscribe( productFilter => this.searchProduct = productFilter.toLowerCase());
  }
  filterProducts(product: Product): boolean {
    if (this.searchProduct === '') {
      return true;
    }
    if (product.title.toLowerCase().match(this.searchProduct)) {
      return true;
    }
    if (product.description.toLowerCase().match(this.searchProduct)) {
      return true;
    }
    if (product.category.toLowerCase().match(this.searchProduct)) {
      return true;
    }
    if (product.price.toString().toLowerCase().match(this.searchProduct)) {
      return true;
    }
    return false;
  }

  numberSort(a: number, b: number): number{
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  }


  getFilteredProducts(): Observable<Product[]> {
    return this.product$.pipe(map(products => {
      return products
        // filtering logic to filter categories
        .filter(product => this.selectedCategories.value?.length === 0 ||
          this.selectedCategories.value.includes(product.category))
        .filter(product => this.filterProducts(product))
        // sorting logic to sort according to the category
        .sort( (a, b) => {
          let result = 0;
          if (this.sortBy.value ) {
            if (this.sortBy.value === 'category'){
              result = a.category.localeCompare(b.category);
            }
            else if (this.sortBy.value === 'title'){
              result = a.title.localeCompare(b.title);
            }
            else if (this.sortBy.value === 'price'){
              result = this.numberSort(a.price, b.price);
            }
            else if (this.sortBy.value === 'description'){
              result = a.description.localeCompare(b.description);
            }
            else if (this.sortBy.value === 'id'){
              result = this.numberSort(a.id, b.id);
            }
            if (this.sortOrder.value === 'desc'){
              result = -result;
            }
          }
          return result;
        });
    }));
  }

  getCategories(): Observable<string[]> {
    return this.product$.pipe(map(products => {
      return [...new Set(products.map(product => product.category))];
    }));
  }

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
