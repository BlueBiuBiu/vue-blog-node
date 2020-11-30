const momentService = require("../service/moment.service")

class momentController {
  async create(ctx,next){
    const content = ctx.request.body.content
    const id = ctx.user.id
    const result = await momentService.create(id,content)
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
}

module.exports = new momentController()