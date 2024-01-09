import { CartShoppingItem } from '@/models/cart-shopping-item.model';
import { Product } from '@/models/product.model';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  itemCount: number;
  entities: { [id: string]: CartShoppingItem };
}

const initialState: CartState = {
  itemCount: 0,
  entities: {},
};

export const cartShoppingSlice = createSlice({
  name: 'cartShoppingSlice',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<{ item: Product }>) => {
      const entity = state.entities[action.payload.item.id];
      state.entities[action.payload.item.id] = entity
        ? { ...entity, quantity: entity.quantity + 1 }
        : { ...action.payload.item, quantity: 1 };
      state.itemCount++;
    },
    reduceCartProduct: (
      state: CartState,
      action: PayloadAction<{ productId: string }>
    ) => {
      if (state.entities[action.payload.productId]) {
        state.entities[action.payload.productId].quantity--;
      } else {
        delete state.entities[action.payload.productId];
      }

      state.itemCount--;
    },
    removeCartProduct: (
      state: CartState,
      action: PayloadAction<{ productId: string }>
    ) => {
      const entityQuantity = state.entities[action.payload.productId].quantity;
      delete state.entities[action.payload.productId];

      state.itemCount -= entityQuantity;
    },
    resetCartShopping: (state: CartState) => {
      state.entities = {};
      state.itemCount = 0;
    },
  },
});

export const {
  addToCart,
  reduceCartProduct,
  removeCartProduct,
  resetCartShopping,
} = cartShoppingSlice.actions;

export const cartShoppingReducer = cartShoppingSlice.reducer;
