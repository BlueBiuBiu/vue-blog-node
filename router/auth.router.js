const router = require("koa-router")

const { login, success } = require("../controller/auth.controller")
const { verifyLogin, verifyToken } = require("../middleware/login.middleware")

const loginRouter = new router()

loginRouter.post("/login", verifyLogin ,login)
loginRouter.get("/test",verifyToken, success)

module.exports = loginRouter