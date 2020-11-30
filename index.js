const app = require("./app")
const config = require("./app/config")

app.listen(8000,() => {
  console.log(`服务器已在${config.APP_PORT}启动`);
})