'use strict'

const mongoose = require('mongoose')

const UsuarioEsquema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  nombreUsuario: String,
  correo: { type: String, unique: true, lowercase: true },
  contrasena: { type: String },
  descripcion: String,
  imagen: String,
  facebookId: String,
  plan: mongoose.Schema.Types.ObjectId,
  fechaRegistro: { type: Date, default: Date.now }
});

/*
UsuarioEsquema.pre('save', function(next){
  now = new Date();
  this.fechaRegistro = now;
  next();
});
*/

module.exports = mongoose.model('Usuario', UsuarioEsquema);
