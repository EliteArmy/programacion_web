'use strict'

var mongoose = require('mongoose')

var ArchivoEsquema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  contenido: String,
  extension: String,
  fechaCreacion: { type: Date, default: Date.now() } ,
  proyectoId: String,
  carpetaId: String,
  usuarioId: String,
  estado: String
})

module.exports = mongoose.model('Archivo', ArchivoEsquema);
