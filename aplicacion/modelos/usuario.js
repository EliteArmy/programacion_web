'use strict'

const mongoose = require('mongoose')

const UsuarioEsquema = new mongoose.Schema({
  nombre: String, 
  correo: { type: String, unique: true, lowercase: true },
  contrasena: { type: String },
  imagen: String,
  fechaRegistro: { type: Date, default: Date.now }
});

/*
UsuarioEsquema.pre('save', function(next){
  now = new Date();
  this.fechaRegistro = now;
  next();
});
*/

module.exports = mongoose.model('usuario', UsuarioEsquema);
