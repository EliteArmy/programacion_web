'use strict'

var mongoose = require('mongoose')

var CarpetaEsquema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  imagen: String, 
  fechaCreacion: { type: Date, default: Date.now() } ,
  
  carpetaId: mongoose.Types.ObjectId, // Id carpeta a la cual pertenece, en caso de ser subcarpeta
  
  subCarpeta: Array, // Arreglo de sub carpetas que puede tener
  archivos: Array, // Arreglo de archivos que puede tener
  proyectos: Array, // arreglo de proyectos que puede tener
  
  estado: String,
  usuarioCreador: mongoose.Types.ObjectId,
})

module.exports = mongoose.model('Carpeta', CarpetaEsquema);
