import {createReducer, on} from '@ngrx/store';
import {addProduct, removeProduct, retrieveCartList} from './products.actions';
import {Cart} from '../model/cart.model';

export const initialState: Cart = {};

export const cartReducer = createReducer(
  initialState,
  on(retrieveCartList, (state, cart) => (cart)),
  on(removeProduct, (state, product) => {
    const cart: Cart = {
      id: state.id,
      date: state.date,
      userId: state.userId,
      products: state?.products?.filter(p => p.productId !== product.id )
    };
    return cart;
  }),
  on(addProduct, (state, product) => {
    const products = state?.products ? state?.products : [];
    const cart: Cart = {
      id: state.id,
      date: state.date,
      userId: state.userId,
      products: [...products, {productId: product.id, quantity: 1}]
    };
    return cart;
  })
);
