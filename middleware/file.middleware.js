const path = require("path")

const multer = require("koa-multer")
const Jimp = require("jimp")

const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file-path")

const avatarUpload = multer({
  dest: `${AVATAR_PATH}`
})

const avatarHandle = avatarUpload.single("avatar")

const pictureUpload = multer({
  dest: `${PICTURE_PATH}`
})

const pictureHandle = pictureUpload.array("pictrue",9)

const pictureResize = async (ctx,next) => {
  const files = ctx.req.files
  for(let file of files){
    console.log(file);
    const destPath = path.join(file.destination,file.filename)
    Jimp.read(file.path).then(res => {
      res.resize(1280,Jimp.AUTO).write(`${destPath}-large`)
      res.resize(640,Jimp.AUTO).write(`${destPath}-middle`)
      res.resize(320,Jimp.AUTO).write(`${destPath}-small`)
    })

  }

  await next()
}

module.exports = {
  avatarHandle,
  pictureHandle,
  pictureResize
}