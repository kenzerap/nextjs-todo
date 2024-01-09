import { Product } from './product.model';

export interface CartShoppingItem extends Product {
  quantity: number;
}
