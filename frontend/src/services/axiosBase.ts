// import store from "../store/store";
import axios from "axios";
// console.log(store.getState());
const axiosBase = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosBase;
