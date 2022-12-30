import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categories-reducer.redux";
import { productReducer } from "./products-reducer";
import { CartItemReducer } from "./carttems-reducer.redux";
import { SearchTagReducer } from "./search-tag-reducer";
import { SortReducer } from "./sort-category-reducer";
import { SortPriceReducer } from "./sort-price-reducer";
import { AccessTokenReducer } from "./access-token-reducer";

export const store = configureStore({
  reducer: {
    categoriesReducer,
    productReducer,
    CartItemReducer,

    SearchTagReducer,
    SortReducer,
    SortPriceReducer,
    AccessTokenReducer,
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
