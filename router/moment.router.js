const router = require("koa-router")
const { verifyToken, verifyPermission } = require("../middleware/login.middleware")

const { create, detail, list, update, remove, listTotal, profileList, listProfile } = require("../controller/moment.controller")
const momentRouter = new router({prefix: "/moment"})

momentRouter.post("/", verifyToken ,create)
momentRouter.get("/:momentId", detail)
momentRouter.get("/", list)
momentRouter.get("/total/length", listTotal)
momentRouter.get("/profile/length", verifyToken, listProfile)
momentRouter.get("/profile/list", verifyToken, profileList)

momentRouter.patch("/:momentId",verifyToken,verifyPermission,update)
momentRouter.delete("/:momentId",verifyToken,verifyPermission,remove)

module.exports = momentRouter