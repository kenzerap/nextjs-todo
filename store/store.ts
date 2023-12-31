import { configureStore } from '@reduxjs/toolkit';
import { cartShoppingReducer } from './slices/cartShoppingSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cartShopping: cartShoppingReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// cartShopping selectors
export const selectCartItemCount = (state: RootState) =>
  state.cartShopping.itemCount;

export const selectCartitems = (state: RootState) => {
  return Object.entries(state.cartShopping.entities).map(([_key, item]) => {
    return item;
  });
};
