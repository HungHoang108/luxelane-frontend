import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import server from "../shared/server";
import { createStore, RootState } from "../../redux/store";
import { fetchAllUser } from "../../redux/user-reducer";

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

describe("Test userReducer", () => {
  test("Should return initial state", () => {
    const initialState = store.getState().userReducer;
    expect(initialState.length).toBe(0);
  });
  test("Should fetch all users", async () => {
    await store.dispatch(fetchAllUser());
    expect(store.getState().userReducer.length).toBe(2);
  });
});
