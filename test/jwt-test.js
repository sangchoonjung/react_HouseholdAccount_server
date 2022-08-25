import jwt from "jsonwebtoken"
const secret = "V6qmk%pVK%9ZX99YmAx03%$&*0gwE$P2"
const w_secret = "6qmk%pVK%9ZX99YmAx03%$&*0gwE$P2"
const token = jwt.sign({ subject: "backend", title: "jwt" }, secret);

// console.log(token)

const result = jwt.verify(token, secret);
console.log(result)

const v_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiZnJvbnRlbmQiLCJ0aXRsZSI6Imp3dCIsImlhdCI6MTY2MTQwMzU0MH0.j1RUb2iESsSgbUZ_A3qnXIcvvt7kx5cWgd3_xy-l2lg";
console.log(jwt.verify(v_token, secret))