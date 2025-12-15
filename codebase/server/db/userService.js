const pool = require('./connection');
const queries = require('./queries');

async function findByUsernameAndPassword(username, password) {
  const [rows] = await pool.execute(queries.loginUser(), [username, password]);
  return rows[0] || null;
}

async function createUser(username, password) {
  const [result] = await pool.execute(queries.registerUser(), [username, password]);
  return result.insertId; // usually useful
}

module.exports = {
  findByUsernameAndPassword,
  createUser
};
