import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import { CartReducer } from "./cartReducer";
import { SearchTagReducer } from "./searchTagReducer";
import { Iterable } from "immutable";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { DarkModeReducer } from "./darkModeReducer";
import { singleProductReducer } from "./singleProductReducer";
import { userReducer } from "./userReducer";

// Augment middleware to consider Immutable.JS iterables serializable
// const isSerializable = (value: any) => Iterable.isIterable(value) || isPlain(value);
// const getEntries = (value: any) => (Iterable.isIterable(value) ? value.entries() : Object.entries(value));

// const serializableMiddleware = createSerializableStateInvariantMiddleware({
//   isSerializable,
//   getEntries,
// });

const reducers = combineReducers({
  categoriesReducer,
  productReducer,
  CartReducer,
  SearchTagReducer,
  DarkModeReducer,
  singleProductReducer,
  userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["CartReducer"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
    // middleware: [serializableMiddleware],
  });
};
const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
