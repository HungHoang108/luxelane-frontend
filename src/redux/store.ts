import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categories-reducer.redux";
import { productReducer } from "./products-reducer";
import { CartItemReducer } from "./carttems-reducer.redux";
import { LoginReducer } from "./loginStatus-reducer";
import { SearchTagReducer } from "./search-tag-reducer";

export const store = configureStore({
  reducer: {
    categoriesReducer,
    productReducer,
    CartItemReducer,
    LoginReducer,
    SearchTagReducer
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
