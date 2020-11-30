const connection = require("../app/database")

class userService {
  async create(user){
    const { username, password } = user
    const statement = `INSERT INTO users (username,password) VALUES(?,?);`
    const result = await connection.execute(statement,[username,password])
    return result
  }

  async getUserByName(username){
    const statement = `SELECT * FROM users WHERE username = ?;`
    const result = await connection.execute(statement,[username])
    return result[0]
  }
}

module.exports = new userService()