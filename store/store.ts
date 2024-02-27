import { configureStore, createSelector } from '@reduxjs/toolkit';
import { cartShoppingReducer } from './slices/cartShoppingSlice';

export const setupStore = () => {
  return configureStore({
    reducer: {
      cartShopping: cartShoppingReducer,
    },
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// cartShopping selectors
export const selectCartItemCount = (state: RootState) =>
  state.cartShopping.itemCount;

export const selectCartitems = createSelector(
  [(state: RootState) => state.cartShopping.entities],
  (entities) =>
    Object.entries(entities).map(([_key, item]) => {
      return item;
    })
);
