const labelService = require("../service/label.service")

const verifyLabelIsExists = async (ctx,next) => {
  const { labels } = ctx.request.body;
  const newLabels = []
  for(let name of labels){
    const labelResult = await labelService.getLabelByName(name)
    const label = { name }
    if(!labelResult.length){
      const result = await labelService.create(name)
      label.id = result.insertId
    } else {
      label.id = labelResult[0].id
    }
    newLabels.push(label)
  }

  ctx.labels = newLabels
  await next()
}

module.exports = {
  verifyLabelIsExists
}