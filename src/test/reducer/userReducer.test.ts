import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import server from "../shared/server";
import { createStore, RootState } from "../../redux/store";
import {
  fetchAllUser,
  getUserSession,
  logInUser,
} from "../../redux/userReducer";

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
    expect(initialState.userList.length).toBe(0);
  });
  test("fetch all users", async () => {
    await store.dispatch(fetchAllUser());
    expect(store.getState().userReducer.userList.length).toBe(2);
  });
  test("login user", async () => {
    const emailAndPassword = {
      email: "john@mail.com",
      password: "changeme",
    };
    await store.dispatch(logInUser(emailAndPassword));
    const access_token = store.getState().userReducer.access_token as string;
    await store.dispatch(getUserSession(access_token));
    const currentUser = store.getState().userReducer.currentUser;
    // expect(currentUser).toBeDefined();
  });
});
