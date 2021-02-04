import {User} from '../model/user.model';
import {Product} from '../model/product.model';
import {Cart} from '../model/cart.model';


export interface AppState {
  user: User;
  products: Product[];
  cart: Cart;
  productFilter: string;
}
