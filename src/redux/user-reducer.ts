import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { UserType, userReducerType, newUserType } from "../types/user.types";
import { LoginType } from "../types/login.types";

const userInitialState: userReducerType = {
  userList: [],
};
const initialUserSession: UserType = {
  id: 0,
  email: "string",
  password: "string",
  name: "string",
  avatar: "string",
  role: "customer",
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
  async ({ email, password }: LoginType, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          email: email,
          password: password,
        }
      );
      const data: { access_token: string } = response.data;
      await thunkAPI.dispatch(getUserSession(data.access_token));
      return data.access_token;
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
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      const e = error as AxiosError;
      return e;
    }
  }
);
export const createUser = createAsyncThunk(
  "createProduct",
  async ({ file, user }: newUserType) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/files/upload",
        { file: file && file[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data.location;
      const newUser = { ...user, avatar: data };
      const newUserResponse = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        newUser
      );
      return newUserResponse.data;
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }
);

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
      .addCase(createUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.userList.push(action.payload);
        } else {
          return state;
        }
      });
  },
});
export const UserSessionSlice = createSlice({
  name: "UserSessionSlice",
  initialState: initialUserSession,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getUserSession.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return state;
      } else {
        return (state = action.payload);
      }
    });
  },
});

export const userReducer = UserSlice.reducer;
export const userSessionReducer = UserSessionSlice.reducer;
