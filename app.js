import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import account from "./route/account.js";
import history from "./route/history.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();

mongoose.connect(process.env.REACT_APP_MONGODB, { dbName: "moneyDiary" });
// mongoose.connect(uri, { dbName: "example" });

app.use(cors()); //신뢰할수없는 url 차단 허용
// app.use(morgan("short"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/account", account);
app.use("/api/history", history);

app.listen(8080, () => {
  console.log("server [start]");
});
