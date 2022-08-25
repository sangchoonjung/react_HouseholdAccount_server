import express, { response } from "express";

const router = express.Router();

router.post("/login", (req, res) => {
    console.log(req.body);
    if (Math.random() > 0.5) {
        res.json({ result: true });
    } else {
        res.json({ result: false });
    }
})

export default router;