import mongoose from "mongoose";
const { Schema } = mongoose;

const UserModel = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", UserModel);

export default User;
