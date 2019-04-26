'use strict'

// Importar el modulo express para crear el servidor web
var express = require('express');
var bodyParser = require('body-parser');

// Crear una aplicacion de nodejs con express
var app = express();
const port = process.env.PORT || 3000

// Definir una carpeta como publica para que los usuarios puedan acceder a su contenido
app.use(express.static("www"));

// Poder parsear el cuerpo de la peticion y poder tratar los datos que enviemos
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // poder admitir peticiones con cuerpo de msj en formato json

// Otra forma de escribirlo más resumido y con variable port:
app.listen (port, () => {
  console.log(`Api rest corriendo en http://localhost: ${port}`)
})

// Correrlo con nodemon instalado: node index.js
