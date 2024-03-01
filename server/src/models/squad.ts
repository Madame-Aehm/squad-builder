import { Schema, model } from "mongoose";
import { Squad } from "../@types/auth";

const schema = new Schema<Squad>({
  name: { type: String, required: true },
  characters: [{ type: String }],
  user: { type: String, required: true }
})

const squadModel = model("squad", schema);

export default squadModel