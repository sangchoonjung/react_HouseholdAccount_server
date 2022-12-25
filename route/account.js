import express from "express";
// 자동완성 믿지말고 뒤에 .js붙혀야한다.
import account from "../model/account.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/valid", async (req, res) => {
  console.log(req.body);
  try {
    const data = jwt.verify(req.body.token, process.env.SECRET_KEY);
    res.status(200).json({ result: true, owner: data.email });
  } catch (e) {
    res.status(401).json({ result: false, message: e.message });
  }
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const findId = await account.findOne({ email: req.body.email });
  if (!findId) {
    const response = await account.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    });
    res.status(200).json({ result: true, message: response });
  } else {
    res
      .status(200)
      .json({ result: false, message: "이미 중복된 아이디가 있습니다." });
  }
});

router.post("/auth", async (req, res) => {
  let { email, password } = req.body;
  console.log(email, password);

  let findData = await account.findOne({ email });
  if (!findData) {
    return res.json({ result: "아이디가 유효하지않다." });
  }
  const com = await bcrypt.compare(password, findData.password);

  if (findData && com) {
    const token = jwt.sign({ email: findData.email }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.json({ result: true, message: token });
    console.log(token);
  } else {
    res.status(401).json({ result: false, message: "비번이 틀립니다." });
  }
});

export default router;
