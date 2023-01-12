import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import { fetchSingleProduct } from "../../redux/singleProductReducer";
import server from "../shared/server";
import { createStore, RootState } from "../../redux/store";
import { fetchAllProducts } from "../../redux/productReducer";
let store: ToolkitStore<
  RootState,
  AnyAction,
  [ThunkMiddleware<RootState, AnyAction, undefined>]
>;
beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.close();
});

beforeEach(() => {
  store = createStore();
});
describe("Test all the actions", () => {
  test("Should return initial state", () => {
    expect(store.getState().singleProductReducer.id).toBe(0);
  });
  test("Should fetch a single product", async () => {
    await store.dispatch(fetchAllProducts());
    await store.dispatch(fetchSingleProduct(1));
    expect(store.getState().singleProductReducer.price).toBe(491);
  });
});
