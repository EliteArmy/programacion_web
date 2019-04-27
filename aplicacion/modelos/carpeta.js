'use strict'

var mongoose = require('mongoose')

var CarpetaEsquema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  imagen: String, 
  fechaCreacion: { type: Date, default: Date.now() } ,
  carpetaId: String,
  usuarioId: String,
  estado: String
})

module.exports = mongoose.model('Carpeta', CarpetaEsquema);
