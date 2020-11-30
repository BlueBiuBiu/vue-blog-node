const jwt = require("jsonwebtoken")
const errorTypes = require("../constants/errorTypes")
const { getUserByName } = require("../service/user.service")
const md5Password = require("../utils/password-handle")
const { PUBLIC_KEY } = require("../app/config")
const authService  = require("../service/auth.service")

const verifyLogin = async (ctx,next) => {
  const { username, password } = ctx.request.body
  if(!username || !password){
    const error = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit("error",error,ctx)
  }

  const result =  await getUserByName(username)
  // console.log(result[0]);
  const user = result[0]
  ctx.user = user
  if(!user){
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit("error",error,ctx)
  }

  if(user.password !== md5Password(password)){
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
    return ctx.app.emit("error",error,ctx)
  }

  await next()
  
}

const verifyToken = async (ctx,next) => {
  // console.log(ctx.headers);
  const authorization = ctx.headers.authorization

  if(!authorization){
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit("error",error,ctx)
  }

  const token = authorization.replace("Bearer ","")

  try {
    const result = jwt.verify(token,PUBLIC_KEY,{
      algorithms: ["RS256"]
    })
    // console.log(result); //{ id: 12, username: 'sky9', iat: 1606378652, exp: 1606465052 }
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit("error",error,ctx)
  }
}

/* const verifyPermission = async (ctx,next) => {
  const { id } = ctx.user
  const { momentId } = ctx.params
  const isPermission = await authService.checkPermission(id,momentId)
  if(!isPermission){
    const error = new Error(errorTypes.UNPERMISSION)
    return ctx.app.emit("error",error,ctx)
  }
  await next()
} */
const verifyPermission = async (ctx,next) => {
  const { id } = ctx.user
  const [key] = Object.keys(ctx.params)
  const value = ctx.params[key]
  const tableName = key.replace("Id","")
  const isPermission = await authService.checkPermission(tableName,id,value)
  if(!isPermission){
    const error = new Error(errorTypes.UNPERMISSION)
    return ctx.app.emit("error",error,ctx)
  }
  await next()
}

module.exports = {
  verifyLogin,
  verifyToken,
  verifyPermission
}