const labelRouter = require("../router/label.router");

const labelService = require("../service/label.service")

class labelController {
  async create(ctx,next){
    const { name } = ctx.request.body
    await labelService.create(name)
    ctx.body = "创建标签成功"
  }

  async list(ctx,next){
    const { offset, limit } = ctx.query
    const result = await labelService.list(offset,limit)
    ctx.body = result
  }
}

module.exports = new labelController()