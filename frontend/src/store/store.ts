import { combineReducers, configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import UserSlice from "./slice/userSlice";
import TaskSlice from "./slice/taskSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  users: UserSlice.reducer,
  tasks: TaskSlice.reducer,
  //   todos: TodoSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
