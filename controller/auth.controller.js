const jwt = require("jsonwebtoken")

const { PRIVATE_KEY } = require("../app/config")

class authController {
  async login(ctx, next){
    const { id, username } = ctx.user
    // console.log(ctx.user);
    const token = jwt.sign({id, username },PRIVATE_KEY,{
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256"
    })
    ctx.body = {"result": "ok",id, username, token}
  }

  async success(ctx, next){
    ctx.body = "成功进入~"
  }
}

module.exports = new authController()