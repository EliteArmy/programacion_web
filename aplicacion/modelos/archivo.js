'use strict'

var mongoose = require('mongoose')

var ArchivoEsquema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  imagen: String,
  fechaCreacion: { type: Date, default: Date.now() } ,

  contenido: String,
  extension: String,

  proyectoId: mongoose.Types.ObjectId, // Proyecto al cual puede pertenecer
  carpetaId: mongoose.Types.ObjectId, // Carpeta a la cual puede pertenecer
  
  estado: String,
  usuarioCreador: mongoose.Types.ObjectId
})

module.exports = mongoose.model('Archivo', ArchivoEsquema);
