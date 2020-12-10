const fs = require("fs")

const { AVATAR_PATH } = require("../constants/file-path")
const userService = require("../service/user.service")
const fileService = require("../service/file.service")

class userController {
  async create(ctx,next){
    const user = ctx.request.body
    const result = await userService.create(user)
    ctx.body = result
  }

  async avatarInfo(ctx,next){
    const { userId } = ctx.params
    const result = await fileService.getAvatarByUserId(userId)
    ctx.response.set("content-type",result.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`)
  }

  async userInfo(ctx,next){
    const { userId } = ctx.params
    const result = await userService.getUserInfo(userId)
    ctx.body = result
  }
}

module.exports = new userController()