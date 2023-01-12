import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import { fetchAllCategories } from "../../redux/categoriesReducer";
import { fetchSingleProduct } from "../../redux/singleProductReducer";
import server from "../shared/server";
import { createStore, RootState } from "../../redux/store";
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
    await store.dispatch(fetchSingleProduct(1));
    expect(store.getState().singleProductReducer.title).toBe("C");
  });
});
