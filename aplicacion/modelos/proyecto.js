'use strict'

var mongoose = require('mongoose')

var ProyectoEsquema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  imagen: String, 
  fechaCreacion: { type: Date, default: Date.now() } ,
  
  carpetaId: mongoose.Types.ObjectId, // Id carpeta a la cual pertenece
  
  archivoCSS: mongoose.Types.ObjectId,
  archivoHTML: mongoose.Types.ObjectId,
  archivoJS: mongoose.Types.ObjectId,
  
  estado: String,
  usuarioCreador: mongoose.Types.ObjectId,
  compartido: Array
})

module.exports = mongoose.model('Proyecto', ProyectoEsquema);
