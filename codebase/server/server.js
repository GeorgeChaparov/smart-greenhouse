const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sessionConfig = require('./config/session');

const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');

const pool = require('./db/connection');

// Verity connection
pool.getConnection()
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection error:", err));

const app = express();

// Template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

// Routes
app.use('/', authRoutes);
app.use('/', homeRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
