const Koa = require("koa")
const cors = require("koa-cors")
const koaParser = require("koa-bodyparser")

// const userRouter = require("../router/user.router")
// const loginRouter = require("../router/auth.router")
const { errorHandle } = require("./errorHandle")
const useRoutes =require("../router")

const app = new Koa()
app.use(koaParser())
app.use(cors())

app.useRoutes = useRoutes
app.useRoutes()
// useRoutes(app)

// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())
// app.use(loginRouter.routes())
// app.use(loginRouter.allowedMethods())

app.on("error",errorHandle)

module.exports = app