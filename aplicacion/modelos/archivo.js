'use strict'

var mongoose = require('mongoose')

var ArchivoEsquema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  imagen: String,
  fechaCreacion: { type: Date, default: Date.now() } ,

  carpetaId: mongoose.Types.ObjectId, // Id Carpeta a la cual puede pertenecer
  proyectoId: mongoose.Types.ObjectId, // Id Proyecto al cual puede pertenecer
  
  contenido: String,
  extension: String,
  
  estado: String,
  usuarioCreador: mongoose.Types.ObjectId,
  compartido: Array
})

module.exports = mongoose.model('Archivo', ArchivoEsquema);
