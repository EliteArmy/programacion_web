'use strict'

// Correrlo con nodemon instalado: node index.js

const mongoose = require('mongoose');
const app = require('./app')
const config = require('./config')

// Segundo se conecta al API
app.listen (config.port, () => {
  console.log(`Aplicación corriendo en http://localhost:${config.port}`)
})

// ====================== CONEXIÓN ======================
mongoose.connect(config.db, (err, res) => {
  
  if (err) {
    return console.log(`Error al conectarse a la base de datos: ${err}`)
  }

  // Si no hay error, muestra el mensaje
  console.log('Conexión con la base de datos establecida...')

})
