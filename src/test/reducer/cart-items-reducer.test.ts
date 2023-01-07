import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import {
  addItem,
  increaseItem,
  decreaseItem,
  removeItem,
} from "../../redux/cart-items-reducer.redux";
import { createStore, RootState } from "../../redux/store";
let store: ToolkitStore<
  RootState,
  AnyAction,
  [ThunkMiddleware<RootState, AnyAction, undefined>]
>;

const item = {
  id: 1,
  image: "string",
  itemName: "string",
  price: 22,
  amount: 1,
};

beforeEach(() => {
  store = createStore();
});
describe("Test all the actions", () => {
  test("Return initial state", () => {
    expect(store.getState().CartItemReducer.length).toBe(0);
  });
  test("should add new item or increase existing item number by 1", () => {
    store.dispatch(addItem(item));
    expect(store.getState().CartItemReducer.length).toBe(1);
  });
  test("should increase existing item number by 1", () => {
    store.dispatch(addItem(item));
    store.dispatch(increaseItem(item));
    expect(store.getState().CartItemReducer[0].amount).toBe(2);
  });
  test("should decrease existing item number by 1", () => {
    store.dispatch(addItem(item));
    store.dispatch(decreaseItem(item));
    expect(store.getState().CartItemReducer.length).toBe(0);
  });
  test("should remove the item", () => {
    store.dispatch(addItem(item));
    store.dispatch(removeItem(item));
    expect(store.getState().CartItemReducer.length).toBe(0);
  });
});
