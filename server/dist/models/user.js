import { Schema, model } from "mongoose";
const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const userModel = model("user", schema);
export default userModel;
//# sourceMappingURL=user.js.map