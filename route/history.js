import express from "express";
import jwt from "jsonwebtoken";
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
        return res.status(401).json({ result: false, messge: e.message });
    }
    next();
})




router.get("/", (req, res) => {
    console.log(req.logonEmail);
    return res.status(200).json({ result: true, datas: [] });
})
router.get("/delete", (req, res) => {
    console.log(req.logonEmail);
    return res.status(200).json({ result: false });
})

export default router;