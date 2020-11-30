const errorTypes = require("../constants/errorTypes")

const errorHandle = (error, ctx) => {
  let status, message;

  switch (error.message) {
    case errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或密码不能为空~";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409; // conflict
      message = "用户已经存在~";
      break;
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400; // conflict
      message = "密码不正确~";
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400; // conflict
      message = "用户不存在~";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401; // conflict
      message = "无效的token~";
      break;
    case errorTypes.UNPERMISSION:
      status = 401; // conflict
      message = "没有权限~";
      break;
    default:
      status = 404
      message = "NOT FOUND"
  }
  ctx.status = status
  ctx.body = message
  console.log(ctx.body);
}

module.exports = {
  errorHandle
}