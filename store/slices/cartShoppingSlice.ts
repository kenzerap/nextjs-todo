'use client';

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
    syncCartLocalStore: (state: CartState) => {
      const cartStorage = localStorage?.getItem('cartShopping')
        ? JSON.parse(localStorage.getItem('cartShopping') || '')
        : {};

      state.entities = cartStorage.entities || {};
      state.itemCount = cartStorage.itemCount || 0;
    },
    addToCart: (state: CartState, action: PayloadAction<{ item: Product }>) => {
      const entity = state.entities[action.payload.item.id];
      state.entities[action.payload.item.id] = entity
        ? { ...entity, quantity: entity.quantity + 1 }
        : { ...action.payload.item, quantity: 1 };
      state.itemCount++;

      updateCartStorate(state);
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

      updateCartStorate(state);
    },
    modifyQuantity: (
      state: CartState,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      if (state.entities[action.payload.productId]) {
        const oldQuantity = state.entities[action.payload.productId].quantity;
        state.entities[action.payload.productId].quantity =
          action.payload.quantity;

        state.itemCount =
          state.itemCount - oldQuantity + action.payload.quantity;
      }

      updateCartStorate(state);
    },
    removeCartProduct: (
      state: CartState,
      action: PayloadAction<{ productId: string }>
    ) => {
      const entityQuantity = state.entities[action.payload.productId].quantity;
      delete state.entities[action.payload.productId];

      state.itemCount -= entityQuantity;

      updateCartStorate(state);
    },
    resetCartShopping: (state: CartState) => {
      state.entities = {};
      state.itemCount = 0;

      updateCartStorate(state);
    },
  },
});

const updateCartStorate = (state: CartState) => {
  const cartShopping: CartState = {
    itemCount: state.itemCount,
    entities: state.entities,
  };
  localStorage.setItem('cartShopping', JSON.stringify(cartShopping));
};

export const {
  syncCartLocalStore,
  addToCart,
  reduceCartProduct,
  removeCartProduct,
  modifyQuantity,
  resetCartShopping,
} = cartShoppingSlice.actions;

export const cartShoppingReducer = cartShoppingSlice.reducer;
