const router = require("koa-router")

const commentRouter = new router({prefix: "/comment"})

const {
  create,
  reply,
  update,
  remove,
  list,
} = require("../controller/comment.controller")

const {
  verifyToken, verifyPermission
} = require("../middleware/login.middleware")

commentRouter.post("/",verifyToken,create)
commentRouter.post("/:commentId",verifyToken,reply)

commentRouter.patch("/:commentId",verifyToken,verifyPermission,update)
commentRouter.delete("/:commentId",verifyToken,verifyPermission,remove)

commentRouter.get("/",list)

module.exports = commentRouter