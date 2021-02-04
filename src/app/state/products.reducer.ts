import {Product} from '../model/product.model';
import {createReducer, on} from '@ngrx/store';
import {retrieveProductsList} from './products.actions';

export const initialState: Product[] = [];

export const productsReducer = createReducer(
  initialState,
  on(retrieveProductsList, (state, {products}) => products)
);
