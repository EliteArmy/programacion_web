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
mongoose.connect(`mongodb://tester:DataPassword1@ds151626.mlab.com:51626/heroku_lj6c5705`, { useNewUrlParser: true })
        .then(()=>{
            console.log("Se conectó a la base de datos remota.");
        })
        .catch(error=>{
            console.error(JSON.stringify(error));   
        });
        
/*
mongoose.connect(config.db, (err, res) => {
  
  if (err) {
    return console.log(`Error al conectarse a la base de datos: ${err}`)
  }

  // Si no hay error, muestra el mensaje
  console.log('Conexión con la base de datos establecida...')
})
*/
