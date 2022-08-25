import express from "express";
// 자동완성 믿지말고 뒤에 .js붙혀야한다.
import account from "../model/account.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const router = express.Router();

const clients = new Set();

router.post("/register", async (req, res) => {
    // console.log({ ...req.body })
    // console.log(req.body)

    // find() 는 배열이나오고 findOne() 객체가 나옴
    let findId = await account.findOne({ email: req.body.email });
    if (!findId) {
        await account.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10)
        });
        let checkin1g = res.json({ result: true })

    } else {
        res.json({ result: false })
    }
});

router.post("/auth", async (req, res) => {
    let { email, password } = req.body;
    let findData = await account.findOne({ email });

    const com = await bcrypt.compare(password, findData.password)
    if (findData && com) {
        const token = jwt.sign({ email: findData.email }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 12 })
        res.json({ result: true, message: token });
        console.log(token)
    } else {
        res.json({ result: "아이디나 비번 유효하지않다." })
    }

});

export default router;