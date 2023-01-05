import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categories-reducer.redux";
import { productReducer } from "./products-reducer";
import { CartItemReducer } from "./carttems-reducer.redux";
import { SearchTagReducer } from "./search-tag-reducer";
import { SortReducer } from "./sort-category-reducer";
import { SortPriceReducer } from "./sort-price-reducer";
import { AccessTokenReducer } from "./access-token-reducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const reducers = combineReducers({
  categoriesReducer,
  productReducer,
  CartItemReducer,
  SearchTagReducer,
  SortReducer,
  SortPriceReducer,
  AccessTokenReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "categoriesReducer",
    "productReducer",
    "SearchTagReducer",
    "SortReducer",
    "SortPriceReducer",
    "AccessTokenReducer",
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
  });
};

const store = createStore();
// export const store = configureStore({
//   reducer: persistedReducer,
// });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
