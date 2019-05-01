'use strict'

/* Middleware de autenticación que nos permite proteger ciertas rutas 
de nuestro aplicativo determinadas rutas van a poder se accesibles 
por ciertos usuarios y otras no si no estan autenticadas */

const servicio = require('../servicios')

// Como es un middleware tiene el atributo next, que pasa la ejecucion de la ruta
// y esta le pase la funcionalidad al controlador final 
function estaAutenticado (req, res, next){
  
  // Comprobar si en el objeto headers de la peticion existe un campo llamado authorization
  if (!req.headers.authorization){
    return res.status(403).send({ message: 'No tienes autorización' })
  }

  // En caso de que si exista, la variable token va a tomar el token de las cabezeras
  // El token se desglosa con split, ya que la cabecera de autorización incluye
  // un texto que se llama bearer y despues el token. Se convierte en un array 
  // y solo hay un espacio por lo que el segundo elemento del array es el token [1]
  const token = req.headers.authorization.split(" ")[1] // El token que ha enviado el cliente en las cabeceras

  servicio.decodificarToken(token)
  .then(respuesta => {
    req.usuario = respuesta
    next()
  }).catch( respuesta => {
    res.status(respuesta.status)
  })
}

// Importando una unica función, por lo que no es necesario llamar el nombre
// de la funcion al momento de exportar el middleware
module.exports = estaAutenticado 
