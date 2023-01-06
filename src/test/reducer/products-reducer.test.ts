import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fetchAllProducts, deleteItem } from "../../redux/products-reducer";

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
    expect(store.getState().productReducer.length).toBe(0);
  });
  test("Should fetch all products", async () => {
    await store.dispatch(fetchAllProducts());
    expect(store.getState().productReducer.length).toBe(3);
  });
  test("delete product", async () => {
    await store.dispatch(fetchAllProducts());
    const product= {
      product: {
        id: 1
      }

    };
    store.dispatch(deleteItem(product));
    expect(store.getState().productReducer.length).toBe(2);
  });
  // test("should create a product", async () => {
  //     const newProduct: NewProductType = {
  //         title: "D",
  //         price: 1000,
  //         description: "Test create product",
  //         categoryId: 1,
  //         images: []
  //     }
  //     await store.dispatch(createProduct(newProduct))
  //     expect(store.getState().productReducer.length).toBe(1)
  // })
  // test("should not create a product", async () => {
  //     const newProduct: CreateProduct = {
  //         title: "E",
  //         price: -1000,
  //         description: "Test create product",
  //         categoryId: 1,
  //         images: []
  //     }
  //     await store.dispatch(createProduct(newProduct))
  //     expect(store.getState().productReducer.length).toBe(0)
  // })
  // test("should sort by name asc", async () => {
  //     await store.dispatch(fetchAllProducts())
  //     store.dispatch(sortByName("asc"))
  //     // console.log("new sorted: ", store.getState().productReducer)
  //     expect(store.getState().productReducer[0].title).toBe("A")
  //     expect(store.getState().productReducer[1].title).toBe("B")
  //     expect(store.getState().productReducer[2].title).toBe("C")
  // })
});
