'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./rutas')

const session = require("express-session");

var publicCarpeta = express.static("public");
var privateCarpeta = express.static("private");

app.use(bodyParser.urlencoded({ extended: false })) // Poder parsear el cuerpo de la peticion y poder tratar los datos que enviemos
app.use(bodyParser.json()) // poder admitir peticiones con cuerpo de msj en formato json

app.use(session({
  secret:"Secret!", 
  resave: true, 
  saveUninitialized: true
}));

app.use( function (req, res, next) {
    if (req.session.correoUsuario) { //Si el usuario ya esta logueado
      privateCarpeta(req, res, next)
    } else
      publicCarpeta(req, res, next);
  }
);

app.use('/api', api)

// Exportar el App
module.exports = app
