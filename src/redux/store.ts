import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categories-reducer.redux";
import { productReducer } from "./products-reducer";
import { CartItemReducer } from "./carttems-reducer.redux";
import { SearchTagReducer } from "./search-tag-reducer";
import { SortReducer } from "./sort-category-reducer";
import { SortPriceReducer } from "./sort-price-reducer";
import { AccessTokenReducer } from "./access-token-reducer";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { combineReducers } from "redux";

const reducers = combineReducers({
  categoriesReducer: categoriesReducer,
  productReducer: productReducer,
  CartItemReducer: CartItemReducer,
  SearchTagReducer: SearchTagReducer,
  SortReducer: SortReducer,
  SortPriceReducer: SortPriceReducer,
  AccessTokenReducer: AccessTokenReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
