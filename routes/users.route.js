const express = require("express");
const ControladorFront = require('../controladores/front.controlador.js');
// const Handlers = require('../handlers/')
const { check, validationResult } = require('express-validator/check')
const app = express.Router();

app.get('/home', ControladorFront.home);
app.get('/login', ControladorFront.login);
app.get('/registro', ControladorFront.registro);
app.post('/api/login', ControladorFront.apiLogin);


app.post('/api/registro', [
    check('nombre').not().isEmpty().isAlpha(),
    check('email').not().isEmpty().isEmail().normalizeEmail().trim(),
    check('password').isLength({min: 5})
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(req.body);
        return res.status(422).json({ errors: errors.array(), req: req.body });
    }
    
    next();
}, ControladorFront.apiRegistro);



module.exports = app
