import express, { json } from "express";
import jwt from "jsonwebtoken";
import history from "../model/history.js";

const router = express.Router();

// auth token check middleware
router.use((req, res, next) => {
    const authorization = req.get("authorization");
    if (!authorization || !authorization.startsWith("Bearer")) {
        return res.status(401).json({ result: false, message: "unauthor" })
    }
    const token = authorization.split(" ")[1];
    // console.log(token)
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        //정상작동이면 payload안에 email이 들어있다.
        req.logonEmail = payload.email;
    } catch (e) {
        return res.status(401).json({ result: false, message: e.message });
    }
    next();
})

router.post("/write",async(req, res) => {
    const account = req.logonEmail;
    console.log(account)
    try{
        let data = await history.create({ ...req.body, account });
        res.status(200).json({ result: true, message: data })
        console.log(data)
    } catch(e) {
    res.status(401).json({result:false,message:e.message})
    }
})



router.get("/", async(req, res) => {
    console.log(req.logonEmail);
    const account = req.logonEmail;
    const month = req.query.month;
    
    let datas = await history.find({ account: account }).lean()
    console.log(datas)
    return res.status(200).json({ result: true,datas:datas});
})



router.get("/delete", (req, res) => {
    console.log(req.logonEmail);
    return res.status(200).json({ result: false });
})

export default router;