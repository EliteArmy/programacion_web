'use strict'

/* Se va a encargar de registro y autenticacion de usuarios */

const Usuario = require('../modelos/usuario')
const servicio = require('../servicios')

function registro (req, res){
  const usuario = new Usuario ({
    nombreUsuario: req.body.nombreUsuario,
    correo: req.body.correo,
  })
  
  // Debemos guardar el usuario
  usuario.save((err) => { // Funcion callback en caso de haber un error
    if (err) res.status(500).send({ message: `Error al crear el usuario: ${err}` })

    // Si no hay error, se envia la respuesta con el parametro token
    // se hace uso del modulo aparte llamado servicio*, y el cual contiene la
    // funcion createToken, la cual recibe el objeto usuario que se ha creado
    // y se encargará de crear el token
    return res.status(200).send({ token: servicio.crearToken(usuario) })
  })
}

// Autenticacion una vez el usuario esta registrado
/* */
function login (req, res){
  Usuario.find({ correo: req.body.correo }, (err, usuario) => {
    if(err) return res.status(500).send({ message: err })
    
    if(!usuario) return res.status(404).send({ message: 'No existe el usuario' })

    req.usuario = usuario 
    
    res.status(200).send({
      message: "Has ingresado correctamente",
      token: servicio.crearToken(usuario)
    })
  })
}

module.exports = {
  registro,
  login
}

// Los Servicios en nodejs y demas plataformas son funciones que 
// nos ayudan a realizar determinadas acciones que podemos repetir 
// a lo largo del codigo. Pueden estar en su propio archivo.
