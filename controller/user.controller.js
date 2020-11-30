const { create } = require("../service/user.service")

class userController {
  async create(ctx,next){
    const user = ctx.request.body
    const result = await create(user)
    ctx.body = result
  }
}

module.exports = new userController()