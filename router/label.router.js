const KoaRouter = require("koa-router")
const labelRouter = new KoaRouter({prefix: "/label"})

const {
  create,
  list
} = require("../controller/label.controller")

const {
  verifyToken
} = require("../middleware/login.middleware")

labelRouter.post("/",verifyToken,create)
labelRouter.get("/",list)

module.exports = labelRouter