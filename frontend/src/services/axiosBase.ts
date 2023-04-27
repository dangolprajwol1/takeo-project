import axios from "axios";
import store from "../store/store";
// console.log(store.getState());
const axiosBase = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosBase;

// import axios from "axios";
// import store from "../store/store";

// const axiosBase = () => {
//   const {
//     users: { token },
//   } = store.getState();
//   console.log(token);

//   const headers = token
//     ? {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//       }
//     : {
//         "Content-Type": "application/json",
//       };

//   console.log(token);
//   return axios.create({
//     baseURL: "http://localhost:8000",
//     headers,
//   });
// };

// export default axiosBase;
