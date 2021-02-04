import {Product} from '../model/product.model';
import {Cart} from '../model/cart.model';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {retrieveCartList} from '../state/products.actions';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root'})
export class ProductService {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products', this.httpOptions);
  }

  getCart(userId: number): Observable<Cart> {
    return this.http.get<Cart>('https://fakestoreapi.com/carts/' + userId, this.httpOptions);
  }

  updateCart(userId: number, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>('https://fakestoreapi.com/carts/' + userId, cart, this.httpOptions).pipe(
      map(data => {
        this.store.dispatch(retrieveCartList(data));
        return data;
      })
    );
  }
}
