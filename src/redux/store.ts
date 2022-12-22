import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { categoriesReducer } from './categories-reducer.redux';
import { productReducer } from './products-reducer';

export const store = configureStore({
  reducer: {
    categoriesReducer,
    productReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

