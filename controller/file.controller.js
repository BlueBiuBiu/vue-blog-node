const {
  APP_HOST,
  APP_PORT
} = require("../app/config")
const fileService = require("../service/file.service")
const userService = require("../service/user.service")

class fileController {
  async saveAvatarInfo(ctx,next){
    // console.log(ctx.req.file);
    const { filename, mimetype, size } = ctx.req.file
    const { id } = ctx.user
    const result = await fileService.getAvatarByUserId(id)
    if(result){
      await fileService.updateAvatar(filename,mimetype,size,id)
      ctx.body = "更新头像成功"
    } else {
      await fileService.createAvatar(filename,mimetype,size,id)
      ctx.body = "上传头像成功"
    }
    const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`
    await userService.updateAvatarUrlById(id,avatarUrl)
  }

  async savePictureInfo(ctx,next){
    const files = ctx.req.files
    const { id } = ctx.user
    const { momentId } = ctx.query
    for(let file of files){
      const { filename, mimetype, size } = file
      await fileService.createPicture(filename,mimetype,size,id,momentId)
    }
    ctx.body = "上传动态图片成功"
  }
}

module.exports = new fileController()