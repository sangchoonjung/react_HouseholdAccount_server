import mongoose from "mongoose";

const histroySchema = new mongoose.Schema({
    account:String,
    itemDate: String,
    useDesc: String,
    cashAmt: String,
    cardAmt: String,
    category: String,
    tag: String
});

export default mongoose.model("history", histroySchema);