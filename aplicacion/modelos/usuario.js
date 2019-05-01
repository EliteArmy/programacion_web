'use strict'

const mongoose = require('mongoose')

// Libreria para encriptar contraseñas
const bcrypt = require('bcrypt-nodejs')

const UsuarioEsquema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  nombreUsuario: String,
  correo: { type: String, unique: true, lowercase: true },
  contrasena: { type: String, select: false },
  imagen: String,
  fechaRegistro: { type: Date, default: Date.now },
  fechaUltimoLogin: Date
});

// Funciones que se pueden ejecutar antes o despues de que el modelo
// haya sido almacenado en la base de datos.

// Antes para poder encriptar la contraseña que introduzca el usuario.
// Antes de que se salve, se ejecute la siguiente funcion, va a ser un callback, 
// que va a recibir el parametro next para puede pasar al siguiente middleware
UsuarioEsquema.pre ('save', function (next) {
  let usuario = this
  
  // Si el usuario no ha modificado su contraseña, queremos que la funcion termine y pase al siguiente middleware
  if (!usuario.isModified('contrasena')) return next()

  // En caso que no, llama a bcrypt y generar un salt de 10. Recibe un error en caso de que hubiese
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    // Si no hay error, vamos a hashear la contraseña con el metodo hash
    bcrypt.hash(usuario.contrasena, salt, null, (err, hash) => { // otro callback con err y hash
      
      // Si hay error, devolvemos el error al siguiente
      if (err) return next(err)

      // Si no hay error, el password no va a ser el que pasó el usuario al cliente,
      // si no el hash que se acaba de crear
      usuario.contrasena = hash
      next()
    })
  })
})

module.exports = mongoose.model('Usuario', UsuarioEsquema);
