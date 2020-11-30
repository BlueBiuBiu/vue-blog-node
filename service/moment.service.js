const connection = require("../app/database")

const sqlFragment = `
    SELECT m.id id, m.content content,m.title title, m.createAt createAt, m.updateAt updateAt,
           JSON_OBJECT("id",u.id,"username",u.username) user
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
`

class momentService {
  async create(id,content){
    const statement = `INSERT INTO moment (content,user_id) VALUES (?,?);`
    const result = await connection.execute(statement,[content,id])
    return result[0]
  }

  async detail(id){
    const statement = `
    ${sqlFragment}
    WHERE m.id = 1;`

    const result = await connection.execute(statement,[id])
    return result[0]
  }

  async list(offset,limit){
    const statement = `
    ${sqlFragment}
    LIMIT ? , ?;`
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
}

module.exports = new momentService()