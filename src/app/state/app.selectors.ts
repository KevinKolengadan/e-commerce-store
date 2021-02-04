import { AppState } from './app.state';

export const selectUser = (state: AppState) => state.user;
export const selectProducts = (state: AppState) => state.products;

export const selectCart = (state: AppState) => state.cart;

export const selectProductFilter = (state: AppState) => state.productFilter;
