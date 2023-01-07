import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import { addItem } from "../../redux/cart-items-reducer.redux";
import server from "../shared/server";
import { createStore, RootState } from "../../redux/store";
let store: ToolkitStore<
  RootState,
  AnyAction,
  [ThunkMiddleware<RootState, AnyAction, undefined>]
>;
// beforeAll(() => {
//   server.listen();
// });
// afterAll(() => {
//   server.close();
// });

beforeEach(() => {
  store = createStore();
});
describe("Test all the actions", () => {
  test("Return initial state", () => {
    expect(store.getState().CartItemReducer.length).toBe(0);
  });
  test("should add new item or increase existing item number by 1", () => {
    const item = {
      id: 1,
      image: "string",
      itemName: "string",
      price: 22,
      amount: 1,
    };
    store.dispatch(addItem(item));
    expect(store.getState().CartItemReducer.length).toBe(1);
  });
});
