const router = require("koa-router")

const { avatarInfo, userInfo } = require("../controller/user.controller")
const userAvatarRouter = new router({prefix: "/user"})

userAvatarRouter.get("/:userId/info", userInfo)
userAvatarRouter.get('/:userId/avatar', avatarInfo);

module.exports = userAvatarRouter