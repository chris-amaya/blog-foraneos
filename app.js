const hbs     = require('hbs');
const path    = require('path');
const bodyParser = require("body-parser");
const express = require('express');
const app     = express();

app.use((req, res, next) => {
    console.log('%s %s', req.method, req.url);
    next();
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CARGANDO RUTAS
const usersRoute = require('./routes/users.route');
const adminRoute = require('./routes/admin.route');
var pub_dir = __dirname + '/dist';

app.set('views', __dirname + '/dist');
hbs.registerPartials(__dirname + '/dist/partials');
app.set('view engine', 'hbs');
app.use(express.static(pub_dir));
app.use(usersRoute);
app.use(adminRoute);


module.exports = app;