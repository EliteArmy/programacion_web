'use strict'

var mongoose = require('mongoose')

var ProyectoEsquema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  imagen: String, 
  fechaCreacion: { type: Date, default: Date.now() } ,
  carpetaId: String,
  usuarioId: String,
  estado: String
})

module.exports = mongoose.model('Proyecto', ProyectoEsquema);
