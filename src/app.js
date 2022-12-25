const express = require('express');
const passwordController = require('./controllers/passwordController');

const app = express();

app.use(express.json());

app.post('/verify', passwordController);

module.exports = app;