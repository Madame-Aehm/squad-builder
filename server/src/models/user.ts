import { Schema, model } from "mongoose";
import { User } from "../@types/auth";

const schema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

const userModel = model("user", schema);

export default userModel