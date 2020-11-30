const connection = require("../app/database")

/* class authService {
  async checkPermission(id, momentId){
    const statement = `SELECT * FROM moment WHERE user_id = ? AND id = ?;`
    const [result] = await connection.execute(statement, [id, momentId])
    return result.length === 0? false : true
  }
}
 */
class authService {
  async checkPermission(tableName,userId, value){
    const statement = `SELECT * FROM ${tableName} WHERE user_id = ? AND id = ?;`
    const [result] = await connection.execute(statement, [userId, value])
    return result.length === 0? false : true
  }
}

module.exports = new authService()