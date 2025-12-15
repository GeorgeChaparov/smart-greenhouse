module.exports = {
  loginUser() {
    return `
      SELECT id, username 
      FROM users 
      WHERE username = ? AND password = SHA2(?, 256)
      LIMIT 1
    `;
  },

  registerUser() {
    return `
      INSERT INTO users (username, password)
      VALUES (?, SHA2(?, 256))
    `;
  }
};
