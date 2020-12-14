const connection = require("../app/database")

const sqlFragment = `
    SELECT m.id id, m.content content,m.title title, m.createAt createAt, m.updateAt updateAt,
           JSON_OBJECT("id",u.id,"username",u.username) user
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
`

class momentService {
  async create(id,content,title){
    const statement = `INSERT INTO moment (content,user_id,title) VALUES (?,?,?);`
    const result = await connection.execute(statement,[content,id,title])
    return result[0]
  }

  async detail(id){
    const statement = `
    SELECT m.id id, m.content content,m.title title, m.createAt createAt, 
			 m.updateAt updateAt,
      JSON_OBJECT("id",u.id,"username",u.username) user,
      JSON_ARRAYAGG(JSON_OBJECT("id",c.id,"content",c.content,"commentId",
                    c.comment_id,'createTime', c.createAt,
                    'user', JSON_OBJECT('id', cu.id, 'username', cu.username))) comments,
      JSON_ARRAYAGG(JSON_OBJECT("id",l.id,"labelName",l.name)) labels
      FROM moment m
      LEFT JOIN users u ON m.user_id = u.id
      LEFT JOIN comment c ON m.id = c.moment_id
      LEFT JOIN users cu ON c.user_id = cu.id
      LEFT JOIN moment_label ml ON m.id = ml.moment_id
      LEFT JOIN label l ON ml.label_id = l.id
      WHERE m.id = ?
      GROUP BY m.id;`
    const result = await connection.execute(statement,[id])
    return result[0]
  }

  async list(offset,limit){
    const statement = `
    SELECT m.id id, m.content content, m.createAt createAt, m.updateAt updateAt, m.title title,
       JSON_OBJECT("id",u.id,"username",u.username) user,
			 (SELECT COUNT(*) FROM comment c WHERE m.id = c.moment_id) commentCount,
			 (SELECT COUNT(*) FROM moment_label ml WHERE m.id = ml.moment_id) labelCount
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    LIMIT ?, ?;`
    const result = await connection.execute(statement,[offset,limit])
    return result[0]
  }

  async recentList(offset,limit){
    const statement = `
    SELECT m.id id, m.content content, m.createAt createAt, m.updateAt updateAt, m.title title,
       JSON_OBJECT("id",u.id,"username",u.username) user,
			 (SELECT COUNT(*) FROM comment c WHERE m.id = c.moment_id) commentCount,
			 (SELECT COUNT(*) FROM moment_label ml WHERE m.id = ml.moment_id) labelCount
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    ORDER BY updateAt DESC
    LIMIT ?, ?;`
    const result = await connection.execute(statement,[offset,limit])
    return result[0]
  }

  async profileList(offset,limit,id){
    const statement = `
    ${sqlFragment}
    WHERE m.user_id = ?
    LIMIT ? , ?;`
    const result = await connection.execute(statement,[id,offset,limit])
    return result[0]
  }

  async listTotal(){
    const statement = `
    ${sqlFragment};`
    const [result] = await connection.execute(statement)
    return result.length
  }

  async listProfile(id){
    const statement = `
    ${sqlFragment}
    WHERE m.user_id = ?;`
    const [result] = await connection.execute(statement,[id])
    return result.length
  }

  async update(momentId,content){
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement,[content,momentId])
    return result
  }

  async remove(momentId){
    const statement = `DELETE FROM moment WHERE id = ?;`
    const result = await connection.execute(statement,[momentId])
    return result
  }

  async hasLabel(momentId,item){
    const statement = `SELECT * FROM moment_label
                       WHERE moment_id = ? AND label_id = ?;`
    const [result] = await connection.execute(statement,[momentId,item])
    return result[0] ? true : false
  }

  async addLables(momentId,labelId){
    const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES(?,?);`
    const [result] = await connection.execute(statement,[momentId,labelId])
    return result
  }
}

module.exports = new momentService()