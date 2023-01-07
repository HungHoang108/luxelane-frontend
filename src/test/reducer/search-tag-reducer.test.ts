import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { searchTagAction } from "../../redux/search-tag-reducer";
import { createStore, RootState } from "../../redux/store";
let store: ToolkitStore<
  RootState,
  AnyAction,
  [ThunkMiddleware<RootState, AnyAction, undefined>]
>;

beforeEach(() => {
  store = createStore();
});
describe("Test all the actions", () => {
  test("Return initial state", () => {
    expect(store.getState().SearchTagReducer.length).toBe(0);
  });
  test("Return initial state", () => {
    const searchTag = "test";
    store.dispatch(searchTagAction(searchTag));
    expect(store.getState().SearchTagReducer.length).toBe(4);
  });
});
