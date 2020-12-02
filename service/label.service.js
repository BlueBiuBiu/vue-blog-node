const connection = require("../app/database")

class laberService{
  async create(name){
    const statement = `INSERT INTO label (name) VALUES(?);`
    const [result] = await connection.execute(statement,[name])
    return result
  }

  async list(offset,limit){
    const statement = `SELECT * FROM label LIMIT ?, ?;`
    const [result] = await connection.execute(statement,[offset,limit])
    return result
  }

  async getLabelByName(name){
    const statement = `SELECT * FROM label WHERE name = ?;`
    const [result] = await connection.execute(statement,[name])
    return result
  }
}

module.exports = new laberService()