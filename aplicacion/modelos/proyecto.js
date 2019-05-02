'use strict'

var mongoose = require('mongoose')

var ProyectoEsquema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  imagen: String, 
  fechaCreacion: { type: Date, default: Date.now() } ,
  
  carpetaId: mongoose.Types.ObjectId, // Id carpeta a la cual pertenece
  archivos: Array, // 3 Archivos (html, css, js)
  
  estado: String,
  usuarioCreador: mongoose.Types.ObjectId
})

module.exports = mongoose.model('Proyecto', ProyectoEsquema);
