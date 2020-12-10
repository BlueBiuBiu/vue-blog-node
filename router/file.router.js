const router = require("koa-router")

const { verifyToken } = require("../middleware/login.middleware")
const { avatarHandle, pictureHandle, pictureResize } = require("../middleware/file.middleware")
const { saveAvatarInfo, savePictureInfo } = require("../controller/file.controller")

const fileRouter = new router({prefix: "/upload"})

fileRouter.post("/avatar", verifyToken, avatarHandle, saveAvatarInfo)
fileRouter.post("/picture", verifyToken, pictureHandle, pictureResize, savePictureInfo)

module.exports = fileRouter