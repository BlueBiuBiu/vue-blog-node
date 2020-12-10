const fs = require("fs")

const momentService = require("../service/moment.service")
const fileService = require("../service/file.service")
const { PICTURE_PATH } = require("../constants/file-path")

class momentController {
  async create(ctx,next){
    const { content, title } = ctx.request.body
    const id = ctx.user.id
    const result = await momentService.create(id,content,title)
    ctx.body = result
  }

  async detail(ctx,next){
    const id = ctx.params.momentId
    const result = await momentService.detail(id)
    ctx.body = result[0]
  }

  async list(ctx, next){
    const { offset, limit } = ctx.query
    const result = await momentService.list(offset,limit)
    ctx.body = result
  }

  async profileList(ctx, next){
    const { offset, limit } = ctx.query
    const { id } = ctx.user
    const result = await momentService.profileList(offset,limit,id)
    ctx.body = result
  }

  async listTotal(ctx, next){
    const result = await momentService.listTotal()
    ctx.body = result
  }

  async listProfile(ctx, next){
    const { id } = ctx.user
    const result = await momentService.listProfile(id)
    ctx.body = result
  }

  async update(ctx,next){
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const result = await momentService.update(momentId,content)
    ctx.body = result
  }

  async remove(ctx,next){
    const { momentId } = ctx.params
    const result = await momentService.remove(momentId)
    ctx.body = result
  }

  async addLables(ctx,next){
    const { momentId } = ctx.params
    const { labels } = ctx
    for(let label of labels){
      const isExist = await momentService.hasLabel(momentId,label.id)
      console.log(isExist);
      if(!isExist){
        await momentService.addLables(momentId,label.id)
      }
    }
    ctx.body = "给动态添加标签成功"
  }

  async fileInfo(ctx,next){
    let { filename } = ctx.params
    const { type } = ctx.query
    const result = await fileService.getFileByFilename(filename)
    const types = ["large","middle","small"]
    if(types.some(item => item === type)){
      filename = `${filename}-${type}`
    }
    ctx.response.set("content-type",result.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  }
}

module.exports = new momentController()