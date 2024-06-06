import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: String,
  },
  {
    versionKey: false,
  }
);

const User = model("user", userSchema);
export default User;
