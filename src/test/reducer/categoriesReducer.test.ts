import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import { fetchAllCategories } from "../../redux/categoryReducer";
import server from "../shared/server";
import { createStore, RootState } from "../../redux/store";
let store: ToolkitStore<RootState, AnyAction, [ThunkMiddleware<RootState, AnyAction, undefined>]>;
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
    expect(store.getState().categoriesReducer.length).toBe(0);
  });
  test("Should fetch all categories", async () => {
    await store.dispatch(fetchAllCategories());
    expect(store.getState().categoriesReducer.length).toBe(3);
  });
});
