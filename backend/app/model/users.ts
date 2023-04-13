import { Schema, model } from "mongoose";
// import { UserData } from "../controller/userController";

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  phone: String,
  activated: Boolean,
  created: { type: Date, default: Date.now },
});

const Users = model("users", UserSchema);

export default Users;
