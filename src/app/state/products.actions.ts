import { createAction, props } from '@ngrx/store';
import {Product} from '../model/product.model';
import {Cart} from '../model/cart.model';

export const addProduct = createAction(
  '[Product List] Add Product to Cart',
  props<Product>()
);

export const retrieveProductsList = createAction(
  '[Product List/API] Retrieve Product Details Success',
  props<{products: Product[]}>()
);

export const removeProduct = createAction(
  '[Product Collection] Remove Product from Cart',
  props<Product>()
);

export const retrieveCartList = createAction(
  '[Cart Object/API] Retrieve Cart Details Success',
  props<Cart>()
);
