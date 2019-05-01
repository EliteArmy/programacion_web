'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./rutas')

// Definir una carpeta como publica para que los usuarios puedan acceder a su contenido
app.use(express.static("www"));

app.use(bodyParser.urlencoded({ extended: false })) // Poder parsear el cuerpo de la peticion y poder tratar los datos que enviemos
app.use(bodyParser.json()) // poder admitir peticiones con cuerpo de msj en formato json

app.use('/api', api)

// Exportar el App
module.exports = app
