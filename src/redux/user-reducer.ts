import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { UserType, userReducerType } from "../types/user.types";
import { LoginType } from "../types/login.types";

const userInitialState: userReducerType = {
  userList: [],
};

export const fetchAllUser = createAsyncThunk("fetchAllUser", async () => {
  try {
    const response = await axios.get("https://api.escuelajs.co/api/v1/users");
    const data: UserType[] = response.data;
    return data;
  } catch (error) {
    const e = error as AxiosError;
    return e;
  }
});

export const logInUser = createAsyncThunk(
  "logInUser",
  async ({ email, password }: LoginType) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          email: email,
          password: password,
        }
      );
      const data: { access_token: string } = response.data;
      return data;
    } catch (error) {
      const e = error as AxiosError;
      return e;
    }
  }
);

export const getUserSession = createAsyncThunk(
  "getUserSession",
  async (access_token: string) => {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const data: UserType = response.data;
      console.log(data);
      return data;
    } catch (error) {
      const e = error as AxiosError;
      return e;
    }
  }
);
// export const createNewUser = createAsyncThunk("createNewUser", async () => {
//   try {
//     const response = await axios.get(
//       `https://api.escuelajs.co/api/v1/categories/${id}/products`
//     );
//     return response.data;
//   } catch (error) {
//     return error as AxiosError;
//   }
// });
// const LoginTokenSlice = createSlice({
//   name: "LoginTokenSlice",
//   initialState: categoriesInitialState,
//   reducers: {},
//   extraReducers: (build) => {
//     build.addCase(logInUser.fulfilled, (state, action) => {
//       if (action.payload && "message" in action.payload) {
//         return state;
//       } else if (!action.payload) {
//         return state;
//       }
//       return action.payload;
//     });
//   },
// });
export const UserSlice = createSlice({
  name: "UserSlice",
  initialState: userInitialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        } else {
          state.userList = action.payload;
        }
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        } else {
          state.access_token = action.payload?.access_token;
        }
      })
      .addCase(getUserSession.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        } else {
          state.currentUser = action.payload;
        }
      });
  },
});
// export const loginReducer = LoginTokenSlice.reducer;
// export default LoginTokenSlice;
export const userReducer = UserSlice.reducer;
