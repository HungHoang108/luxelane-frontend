import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { UserType, userReducerType, newUserType } from "../types/UserType";
import { LoginType } from "../types/LoginType";

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

export const logInUser = createAsyncThunk("logInUser", async ({ email, password }: LoginType) => {
  try {
    await axios
      .post("https://luxelane.azurewebsites.net/api/v1/user/signin", {
        email: email,
        password: password,
      })
      .then(async (response) => {
        const data: string = response.data.token;
        data && localStorage.setItem("userToken", data);
        await axios
          .get("https://luxelane.azurewebsites.net/api/v1/user/profile", {
            headers: {
              Authorization: `Bearer ${data}`,
            },
          })
          .then((response) => {
            const data = response.data;
            localStorage.setItem("userProfile", JSON.stringify(data));
            return data;
          });
      });
  } catch (error) {
    const e = error as AxiosError;
    return e;
  }
});

export const createUser = createAsyncThunk("createUser", async ({ file, user }: newUserType) => {
  try {

    const formData = new FormData();
    const imgFile = file;
    if (imgFile) {
      formData.append("file", imgFile);
    }
    formData.append("upload_preset", "luxelane");

    await axios
    .post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, formData)
    .then(async (res) => {
      const imageUrl = res.data.secure_url;
      const userInfo = {
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "userName": user.userName,
        "password": user.password,
        "avatar": imageUrl
      }
      console.log(userInfo)
      await axios
        .post("https://luxelane.azurewebsites.net/api/v1/user/signup", userInfo)
        .then((res) => {
          const data = res.data;
          return data;
        });
    });

  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
});

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
  },
});

export const userReducer = UserSlice.reducer;

