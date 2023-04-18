import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosBase from "../../services/axiosBase";
import { UserData } from "../../services/userType";
export const UserLogin = createAsyncThunk(
  "user/UserLogin",
  async (credentials: string[]) => {
    const data = await axiosBase.post("api/v1/login", {
      email: credentials[0],
      password: credentials[1],
    });

    return data.data;
  }
);
export const UserRegister = createAsyncThunk(
  "user/UserRegister",
  async (userdata: UserData) => {
    const data = await axiosBase.post("api/v1/user", userdata);

    return data.data;
  }
);
export interface userState {
  token: string;
  loggedIn: boolean;
  loggedInUser: string;
  userId: string;
  error: string[];
  success: string;
  loading: boolean;
}
const initState: userState = {
  token: "",
  loggedIn: false,
  loggedInUser: "",
  userId: "",
  error: [],
  success: "",
  loading: false,
};
const UserSlice = createSlice({
  name: "user",

  initialState: initState,
  reducers: {
    LoginActions(state, action) {
      state.token = action.payload.token;
      state.loggedInUser = action.payload.user;
      state.userId = action.payload.uid;
      state.loggedIn = true;
    },
    LogoutActions(state, action) {
      state.loggedIn = false;
      state.token = "";
      state.userId = "";
    },
    SetError(state, action) {
      state.error.push(...action.payload);
    },
    ResetError(state) {
      state.error = [];
      state.success = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(UserLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        // console.log(action);
        state.error = action.payload.error ? action.payload.message : [];
        state.token = action.payload.token;
        state.loggedInUser = action.payload.user;
        state.userId = action.payload.uid;
        state.loggedIn = action.payload.error ? false : true;
        state.loading = false;
      })
      .addCase(UserLogin.rejected, (state, action: any) => {
        state.error = action.payload.error ? action.payload.message : [];
        state.loading = false;
      })
      .addCase(UserRegister.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(UserRegister.fulfilled, (state, action) => {
        state.error = action.payload.error ? action.payload.message : [];
        state.success = !action.payload.error
          ? "Registered user Successfully !!"
          : "";
        state.loading = false;
      })
      .addCase(UserRegister.rejected, (state, action: any) => {
        state.error = action.payload.error ? action.payload.message : [];
        state.loading = false;
      });
  },
});
export const { LoginActions, LogoutActions, SetError, ResetError } =
  UserSlice.actions;
export default UserSlice;
