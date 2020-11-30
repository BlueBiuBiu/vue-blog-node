const errorTypes = require("../constants/errorTypes")
const { getUserByName } = require("../service/user.service") 
const md5password = require("../utils/password-handle")

const verifyUser = async (ctx,next) => {
  const {username,password} = ctx.request.body
  if(!username || !password){
    const error = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit("error",error,ctx)
  }

  const result = await getUserByName(username)
  // console.log(result);
  if(result.length){
    const error = new Error(errorTypes.USER_ALREADY_EXISTS)
    return ctx.app.emit("error",error,ctx)
  }
  await next()
}

const handlePassword = async (ctx,next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password)
  // console.log(ctx.request.body);
  await next()

}

module.exports = {
  verifyUser,
  handlePassword
}