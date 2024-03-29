import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import server from "../shared/server";
import { createStore, RootState } from "../../redux/store";
import {
  createUser,
  fetchAllUser,
} from "../../redux/userReducer";
import { newUserInputField } from "../../types/UserType";

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
  test("Should fetch all users", async () => {
    await store.dispatch(fetchAllUser());
    expect(store.getState().userReducer.userList.length).toBe(2);
  });

  test("should create an user", async () => {
    const file: File = {
      lastModified: 0,
      name: "test",
      webkitRelativePath: "",
      size: 0,
      type: "",
      arrayBuffer: function (): Promise<ArrayBuffer> {
        throw new Error("Function not implemented.");
      },
      slice: function (
        start?: number | undefined,
        end?: number | undefined,
        contentType?: string | undefined
      ): Blob {
        throw new Error("Function not implemented.");
      },
      stream: function () {
        throw new Error("Function not implemented.");
      },
      text: function (): Promise<string> {
        throw new Error("Function not implemented.");
      },
    };
    const user: newUserInputField = {
      firstName: "van hung",
      lastName: "hoang",
      email: "testt1@a.com",
      password: "123456",
      userName: "test",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=6440"
    };
    await store.dispatch(createUser({ file, user }));
    expect(store.getState().userReducer.userList.length).toBe(1);
  });
});
