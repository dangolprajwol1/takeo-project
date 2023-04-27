import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosBase from "../../services/axiosBase";
import { UserData } from "../../services/userType";
import axios from "axios";
import { EmptyTask, GetTask } from "./taskSlice";
export const UserLogin = createAsyncThunk(
  "user/UserLogin",
  async (credentials: string[], thunkAPI) => {
    const data = await axiosBase.post("api/v1/login", {
      email: credentials[0],
      password: credentials[1],
    });
    if (!data.data.error) {
      thunkAPI.dispatch(GetTask(data.data.uid));
    }
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
export const UserWeatherInfo = createAsyncThunk(
  "user/UserWeatherInfo",
  async (userPosition: number[]) => {
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${userPosition[1]}&lon=${userPosition[0]}&appid=967db3ba80563beaa4e4110dd5b0379c&units=metric`
    );
    return weather.data;
  }
);
export const LogoutUser = createAsyncThunk(
  "user/Logout",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(EmptyTask());
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
  location: number[];
  weather: any[];
}
const initState: userState = {
  token: "",
  loggedIn: false,
  loggedInUser: "",
  userId: "",
  error: [],
  success: "",
  loading: false,
  location: [],
  weather: [],
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
    LogoutActions(state) {
      return initState;
    },
    SetError(state, action) {
      state.error.push(...action.payload);
    },
    ResetError(state) {
      state.error = [];
      state.success = "";
    },
    SetLocation(state, action) {
      state.location = action.payload;
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
      })
      .addCase(UserWeatherInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(UserWeatherInfo.fulfilled, (state, action) => {
        state.weather = action.payload;
        state.loading = false;
      })
      .addCase(UserWeatherInfo.rejected, (state, action: any) => {
        state.loading = false;
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        return initState;
      });
  },
});
export const {
  LoginActions,
  LogoutActions,
  SetError,
  ResetError,
  SetLocation,
} = UserSlice.actions;
export default UserSlice;
