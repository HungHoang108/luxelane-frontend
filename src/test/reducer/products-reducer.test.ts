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
describe("Test all the actions", () => {
  test("Should return initial state", () => {
    expect(store.getState().productReducer.length).toBe(0);
  });
  test("Should fetch all products", async () => {
    await store.dispatch(fetchAllProducts());
    expect(store.getState().productReducer.length).toBe(3);
  });
  // test("delete product", async () => {
  //   // await store.dispatch(fetchAllProducts());

  //   // await store.dispatch(deleteProduct(1));
  //   const test3 = store.getState().productReducer;
  //   // expect(store.getState().productReducer).toBe(2);
  // });

  test("should create a product", async () => {
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
    const product: NewProductType = {
      title: "D",
      price: 1000,
      description: "Test create product",
      categoryId: 1,
      images: [],
    };

    await store.dispatch(createProduct({ file, product }));
    expect(store.getState().productReducer.length).toBe(1);
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
