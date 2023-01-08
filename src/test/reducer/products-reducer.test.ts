import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import {
  fetchAllProducts,
  deleteItem,
  deleteProduct,
  createProduct,
} from "../../redux/products-reducer";
import server from "../shared/server";
import { createStore, RootState } from "../../redux/store";
import {
  FileAndNewProductForm,
  NewProductType,
} from "../../types/new-product.type";
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
// let fl = new FileList();
describe("Test all the actions", () => {
  test("Should return initial state", () => {
    expect(store.getState().productReducer.length).toBe(0);
  });
  test("Should fetch all products", async () => {
    await store.dispatch(fetchAllProducts());
    expect(store.getState().productReducer.length).toBe(3);
  });
  // test("delete product", async () => {
  // // await store.dispatch(fetchAllProducts());

  //   // await store.dispatch(deleteProduct(1));
  //   const test3 = store.getState().productReducer
  //   console.log("test33333333333333333",test3)
  //   // expect(store.getState().productReducer).toBe(2);
  // });

  test("should create a product", async () => {
    const newItem: NewProductType = {
      title: "D",
      price: 1000,
      description: "Test create product",
      categoryId: 1,
      images: ["test"],
    };
    const newItemForm: FileAndNewProductForm = {
      file: null,
      product: newItem,
    };
    await store.dispatch(createProduct(newItemForm));
    // expect(store.getState().productReducer.length).toBe(1)
  });
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
