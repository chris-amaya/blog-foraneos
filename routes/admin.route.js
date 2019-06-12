const express = require("express");
const ControladorAdmin = require("../controladores/admin.controlador");
const app = express.Router();

app.get('/panel', ControladorAdmin.login);


module.exports = app;