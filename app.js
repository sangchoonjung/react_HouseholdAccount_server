import express from "express";
import mongoose from "mongoose";
import api from "./route/api.js"
import morgan from "morgan";
import cors from "cors"
const app = express();

app.use(cors()); //신뢰할수없는 url 차단 허용
app.use(morgan("short"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", api);














app.listen(8080, () => {
    console.log("server [start]");
})