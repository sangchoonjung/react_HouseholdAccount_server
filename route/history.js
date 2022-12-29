import express from "express";
import jwt from "jsonwebtoken";
import history from "../model/history.js";

const router = express.Router();

// auth token check middleware
router.use((req, res, next) => {
  const authorization = req.get("authorization");
  // console.log(authorization.startsWith("Bearer"), "헤더")
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ result: false, message: "토큰이 존재하지않습니다." });
  }
  const token = authorization.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    //정상작동이면 payload안에 email이 들어있다.
    req.logonEmail = payload.email;
  } catch (e) {
    return res.status(401).json({ result: false, message: e.message });
  }
  next();
});

//내용 넣기
router.post("/write", async (req, res) => {
  const account = req.logonEmail;
  console.log(account);
  try {
    let data = await history.create({ ...req.body, account });
    res.status(200).json({ result: true, message: data });
    console.log(data);
  } catch (e) {
    res.status(401).json({ result: false, message: e.message });
  }
});

//조회
router.get("/", async (req, res) => {
  const account = req.logonEmail;
  const month = req.query.month;
  console.log(month);

  let datas = await history.find({ account: account }).lean();
  datas = datas.filter((one) => {
    return one.itemDate.startsWith(month);
  });
  console.log(datas);
  return res.status(200).json({ result: true, datas: datas });
});

//검색

router.get("/search", async (req, res) => {
  const begin = new Date(req.query.begin).toISOString().slice(0, 10);
  const endDate = new Date(req.query.end);
  endDate.setDate(endDate.getDate() + 1);
  const end = endDate.toISOString().slice(0, 10);
  const account = req.logonEmail;
  const itemDate = { $gte: begin, $lt: end };

  try {
    const datas = await history
      .find({
        account: account,
        itemDate: itemDate,
      })
      .sort("itemDate")
      .lean();

    return res.status(200).json({ result: true, datas: datas });
  } catch (err) {
    res.status(401).json({ result: false, message: err.message });
  }
});

//삭제

router.post("/delete", async (req, res) => {
  const { data } = req.body;
  console.log(data, "아이디");
  try {
    const response = await history.deleteMany({ _id: { $in: data } });
    console.log(response)
    return res.status(200).json({ result: true, message: response });
  } catch (e) {
    return res.status(401).json({ result: false, message: "삭제안됨" })
  }
});

export default router;
