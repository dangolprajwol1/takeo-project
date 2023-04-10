import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  phone: Number,
  activated: Boolean,
  created: { type: Date, default: Date.now },
});

const Users = model("users", UserSchema);

export default Users;
