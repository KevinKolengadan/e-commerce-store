import {createReducer, on} from '@ngrx/store';
import {updateProductFilter} from './products.actions';

export const productFilterReducer = createReducer(
  '',
  on(updateProductFilter, (state, {productFilter}) => productFilter)
);
