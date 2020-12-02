const connection = require("../app/database")

class commentService {
  async create(userId,content,momentId,commentId){
    const statement = `INSERT INTO comment(content,moment_id,user_id,comment_id) VALUES(?,?,?,?);`
    const [result] = await connection.execute(statement,[content,momentId,userId,commentId])
    return result
  }

  async reply(userId,content,momentId,commentId){
    const statement = `INSERT INTO comment(content,moment_id,user_id,comment_id) VALUES(?,?,?,?);`
    const [result] = await connection.execute(statement,[content,momentId,userId,commentId])
    return result
  }

  async update(content,commentId){
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement,[content,commentId])
    return result
  }

  async remove(commentId){
    const statement = `DELETE FROM comment WHERE id = ?;`
    const [result] = await connection.execute(statement,[commentId])
    return result
  }
  
  async getCommentsByMomentId(momentId){
    const statement = `SELECT c.id, c.content, c.comment_id, c.createAt createTime,
                       JSON_OBJECT("id",u.id,"username",u.username) user
                       FROM comment c
                       LEFT JOIN users u on c.user_id = u.id 
                       WHERE c.moment_id = ?;`
    const [result] = await connection.execute(statement,[momentId])
    return result
  }
}

module.exports = new commentService()