import { Schema, model } from "mongoose";
const schema = new Schema({
    name: { type: String, required: true },
    characters: [{ type: String }],
    user: { type: String, required: true }
});
const squadModel = model("squad", schema);
export default squadModel;
//# sourceMappingURL=squad.js.map