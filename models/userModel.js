import mongoose from "mongoose";
const { Schema } = mongoose;

const UserModel = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, require: true, default: false},
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", UserModel);

export default User;
