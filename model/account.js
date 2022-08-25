import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    name: String,
    gender: String,
    birth: Number
});

export default mongoose.model("account", accountSchema);