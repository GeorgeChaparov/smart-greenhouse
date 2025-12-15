const userService = require('../db/userService');

exports.showLoginPage = (req, res) => {
  res.render('login');
};

exports.showRegisterPage = (req, res) => {
  res.render('login');
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userService.findByUsernameAndPassword(username, password);

    if (!user) {
      return res.redirect('/login?error=1');
    }

    req.session.user = { username: user.username };
    res.redirect('/');

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error");
  }
};

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    await userService.createUser(username, password);
    res.redirect('/login');

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).send("Server error");
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
