'use strict'

// Los Servicios en nodejs y demas plataformas son funciones que 
// nos ayudan a realizar determinadas acciones que podemos repetir 
// a lo largo del codigo. Pueden estar en su propio archivo.

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

// === Funcion que crea los Tokens
function crearToken (usuario) {
  
  // payload = datos que viajan en el cliente y servidor
  // Se debe evitar poner mucha información en ellos
  const payload = {
    sub: usuario._id, // id del usuario en mongo
    iat: moment().unix(), // fecha para indicar cuando fue creado el token
    exp: moment().add(14, 'days').unix()  // y en que momento va a expirar
  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}

// === Funcion que decodifica los Tokens
function decodificarToken (token){

  // Promesas:
  // resolve: la promesa se resuelve, se resuelve la funcion que se llama, 
  // reject: se invoca cuando ha ocurrido un error y la promesa no se ha podido cumplir
  // decode recoje el token ya decodificado y esto será una promesa
  // Utilizaremos resolve para devolver el token decodificado, y reject cuando haya un error
  // el .then recoje el resolve o el reject
  const decode = new Promise((resolve, reject) => { // recibe una funcion que tiene 2 parametros
    
    // dentro del try la logica que decodifica el token
    try {
      
      // Decodificación del token con el secret
      const payload = jwt.decode(token, config.SECRET_TOKEN)
      
      // Comprobacion si el token es valido o si ya ha caducado
      if (payload.exp <= moment().unix()){ // Ya ha caducado
        reject({
          status: 401,
          message: 'El Token ha expirado'
        })
      }
      resolve(payload.sub) // _id del usuario
    } catch (err) {
      reject({
        status: 500,
        message: 'Invalid Token'
      })
    }
  })

  return decode // devuelve la promesa
}

module.exports = {
  crearToken,
  decodificarToken
} 

// Antes de pasar la funcionalidad al siguiente middleware o controlador final
// de la ruta, en el objeto user del request, se pone el que envia el payload 
// del usuario y se pasa con next al siguiente middleware
// req.user = payload.sub
// next()