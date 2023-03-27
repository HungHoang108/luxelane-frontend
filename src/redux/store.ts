import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import { CartItemReducer } from "./cartItemsReducer";
import { SearchTagReducer } from "./searchTagReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { DarkModeReducer } from "./darkModeReducer";
import { singleProductReducer } from "./singleProductReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  categoriesReducer,
  productReducer,
  CartItemReducer,
  SearchTagReducer,
  DarkModeReducer,
  singleProductReducer,
  userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["categoriesReducer", "productReducer", "SearchTagReducer", "SortReducer", "SortPriceReducer"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
  });
};
const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
