import jwt from "jsonwebtoken"

const secret = "V6qmk%pVK%9ZX99YmAx03%$&*0gwE$P2"

const token = jwt.sign({ subject: "backend" }, secret, { expiresIn: 5 });

setTimeout(() => {
    const r = jwt.verify(token, secret);
    console.log(r);
}, 6000);

