import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import {
  fetchAllProducts,
  deleteProduct,
  createProduct,
  editProductThunk,
  sortByPrice,
} from "../../redux/productReducer";
import server from "../shared/server";
import { createStore, RootState } from "../../redux/store";
import { NewProductType } from "../../types/NewProductType";
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
      name: "D",
      description: "Test create product",
      price: 1000,
      quantity: 100,
      images: [],
      categoryId: 1
    };
    await store.dispatch(createProduct({ file, product }));
    expect(store.getState().productReducer.length).toBe(1);
  });
  test("should update product", async () => {
    await store.dispatch(fetchAllProducts());
    await store.dispatch(
      editProductThunk({
        id: 1,
        price: 600,
      })
    );
    expect(
      store.getState().productReducer.find((item) => item.id === 1)?.price
    ).toBe(600);
  });
  test("should sort by price", async () => {
    await store.dispatch(fetchAllProducts());
    store.dispatch(sortByPrice("price-up"));
    expect(store.getState().productReducer[0].name).toBe("B");
    expect(store.getState().productReducer[1].name).toBe("C");
    expect(store.getState().productReducer[2].name).toBe("A");
  });
  test("delete product", async () => {
    await store.dispatch(deleteProduct(1));
    await store.dispatch(fetchAllProducts());
    expect(store.getState().productReducer.length).toBe(2);
  });
});
