const router = require("koa-router")

const { create } = require("../controller/user.controller")
const { verifyUser,handlePassword } = require("../middleware/user.middleware")
const userRouter = new router({prefix: "/register"})

userRouter.post("/",verifyUser,handlePassword,create)

module.exports = userRouter