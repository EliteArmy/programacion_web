'use strict'

// Al no estar instalado por npm, se le debe indicar la ruta
const Usuario = require('../modelos/usuario')
const servicio = require('../servicios')
const bcrypt = require('bcrypt-nodejs')

function getUsuario (req, res) {
  // params porque viene como parametro de la url
  let usuarioId = req.params.usuarioId // variable para guardar el id

  // Función Usuario, que busque por ID (findById) de mongoose
  // y tambien recibe un callback, error si existiese y el usuario si lo encuentra
  Usuario.findById(usuarioId, (err, usuario) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}`})
    
    // Si el usuario no existe, se retorna este mensaje
    if(!usuario) return res.status(404).send({ message: `El usuario no existe`})
    
    res.status(200).send({ usuario })
  })
}

function getUsuarios(req, res) {
  Usuario.find({}, (err, usuarios) => {
    if (err) return res.status(500).send({ message: `Error al realizar la peticición: ${err}`})    
    if (!usuarios) return res.status(404).send({ message: `No existen usuarios` })
    res.status(200).send({ usuarios })
  })
}

function saveUsuario(req, res){
  console.log('POST /api/usuario')
  console.log(req.body) // gracias a bodyparser, ya viene parseado, viene como objeto json

  let usuario = new Usuario() // Usuario es el modelo de la base de datos
  
  usuario.nombre = req.body.nombre // req.body - tenemos todo el cuerpo de la cabecera
  usuario.correo = req.body.correo
  usuario.contrasena = req.body.contrasena
  usuario.imagen = req.body.imagen // No almacena si no es de los previamente definidos
  usuario.fechaRegistro = req.body.fechaRegistro

  usuario.save((err, usuarioStored) => {
    if (err) res.status(500).send({ message: `Error al salvar en la base de datos: ${err}`})
    
    // Devuelve los campos mas los que agrego mongo
    res.status(200).send({ usuario: usuarioStored })
  })
}

function updateUsuario (req, res) {
  console.log('PUT /api/usuario')
  console.log(req.body)
  
  let usuarioId = req.params.usuarioId
  let update = req.body

  Usuario.findByIdAndUpdate(usuarioId, update, (err, usuarioUpdated) => {
    if (err) res.status(500).send({ message: `Error al actualizar el usuario: ${err}`})

    res.status(200).send({ usuario: usuarioUpdated })
  })
}

function deleteUsuario (req, res) {
  let usuarioId = req.params.usuarioId

  Usuario.findById(usuarioId, (err, usuario) => {
    if (err) res.status(500).send({ message: `Error al borrar el usuario: ${err}`})

    usuario.remove(err => {
      if (err) res.status(500).send({ message: `Error al borrar el usuario: ${err}`})
      
      res.status(200).send({ message: `El usuario ha sido eliminado` })
    })

  })
}

// ================== PETICIONES AUTENTICACIÓN ==================
/* Se va a encargar de registro y autenticacion de usuarios */

function registro (req, res){
  const usuario = new Usuario ({
    nombreUsuario: req.body.nombreUsuario,
    correo: req.body.correo,
    contrasena: req.body.contrasena,
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
function login (req, res){

  Usuario.findOne({ correo: req.body.correo }, (err, usuario) => {
    
    if(err) return res.status(500).send({ message: err })
    
    if(!usuario) return res.status(404).send({ message: 'No existe el usuario' })
    
    //const password_verification = bcrypt.compareSync(req.body.contrasena, usuario.contrasena);        
        
    if (password_verification){
      req.usuario = usuario;
      res.status(200).send({
        message: "Has ingresado correctamente",
        token: servicio.crearToken(usuario)
      });
    } else {
      res.status(500).send({message: 'Email o Contraseña incorrectos'});  
    } 

    //req.usuario = usuario 
    
    // Login exitoso
    /*res.status(200).send({
      message: "Has ingresado correctamente",
      token: servicio.crearToken(usuario)
    })*/
  })

}



// Se exportan las funciones
module.exports = {
  getUsuario,
  getUsuarios,
  saveUsuario,
  updateUsuario,
  deleteUsuario,
  registro,
  login
}

// Los Servicios en nodejs y demas plataformas son funciones que 
// nos ayudan a realizar determinadas acciones que podemos repetir 
// a lo largo del codigo. Pueden estar en su propio archivo.
