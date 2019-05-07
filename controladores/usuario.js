'use strict'

// Al no estar instalado por npm, se le debe indicar la ruta
const Usuario = require('../modelos/usuario');
const mongoose = require("mongoose");

function getUsuario (req, res) {
  //console.log('GET /api/usuario/ID')

  // params porque viene como parametro de la url
  //let usuarioId = req.params.usuarioId // variable para guardar el id
  let usuarioId = req.session.codigoUsuario // variable session para guardar el id

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

// Registro de nuevos Usuarios
function saveUsuario(req, res){
  //console.log('POST /api/usuario')
  console.log(req.body) // gracias a bodyparser, ya viene parseado, viene como objeto json

  let usuario = new Usuario() // Usuario es el modelo de la base de datos
  
  usuario.nombreUsuario = req.body.nombreUsuario // req.body - tenemos todo el cuerpo de la cabecera
  usuario.correo = req.body.correo
  usuario.contrasena = req.body.contrasena
  usuario.imagen = req.body.imagen // No almacena si no es de los previamente definidos
  usuario.fechaRegistro = Date.now()

  usuario.save((err, usuarioStored) => {
    if (err) res.status(500).send({ message: `Error al salvar en la base de datos: ${err}`})
    
    // Devuelve los campos mas los que agrego mongo
    res.status(200).send({ estatus: 1, mensaje: "Usuario guardado con exito!", usuario: usuarioStored })
  })
}

function updateUsuario (req, res) {
  //console.log('PUT /api/usuario')
  //console.log(req.body)
  //let usuarioId = req.params.usuarioId // variable para guardar el id

  let usuarioId = req.session.codigoUsuario // variable session para guardar el id
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
// Hace el Login del usuario
function loginUsuario(req, res){
  //console.log('POST /login') // Imprime en terminal

  Usuario.find({correo: req.body.correo, contrasena: req.body.contrasena})
    .then(data=>{
      //console.log(`Data luego del Login: ${data}`) // Imprime en terminal todo el usuario y sus datos
      
      if(data.length == 1){ // Significa que si encontro un usuario con las credenciales indicadas
        
        //Establecer las variables de sesion
        req.session.codigoUsuario = data[0]._id;
        req.session.correoUsuario = data[0].correo;
        req.session.nombreUsuario = data[0].nombreUsuario;
        res.send({ estatus: 1, mensaje: `Usuario autenticado con éxito`, usuario: data[0]});
      } else {
        res.send({ estatus: 0, mensaje: `Credenciales Invalidas` })
      }
    })
    .catch(error=>{
      res.send(error);
    }); 
}

// Busca los datos del Usuario que esta loggeado
function usuarioLogeado(req, res){
  //console.log('GET /Loged') // Imprime en terminal
  
  Usuario.find({_id: req.session.codigoUsuario})
    .then(data=>{
      //console.log(`data Usuario Logaedo: ${data}`) // Imprime en terminal
      res.send(data);
    })
    .catch(error=>{
      res.send(error);
    });
}

function logoutUsuario(req, res){
  //console.log('GET /logout')

  req.session.destroy();
  //res.redirect("/login.html");
  res.send({ estatus: 1, mensaje: `Salió del Sitio` });
  //res.status(200).send({ mensaje: `Ha salido del sitio` })
}

function denegarUsuario(req, res){
  //console.log('GET /peticion-registringido')
  verificarAutenticacion()
}

/// Para agregar seguridad a una ruta especifica, esta función sería llamada desde alguna peticion.
function verificarAutenticacion(req, res, next){
	if(req.session.correoUsuario)
		return next();
	else
		res.send("ERROR, ACCESO NO AUTORIZADO");
}

// Login con facebook
function fblogin (req, res){
  console.log(req.body)
  Usuario.find({facebookId: req.body.facebookId})
    .then(data=>{
      if (data.length == 1){
        req.session.codigoUsuario = data[0]._id;
        req.session.correoUsuario = data[0].correo;
        req.session.nombreUsuario = data[0].nombreUsuario;

        //Actualizar los datos
        Usuario.updateOne({_id:data[0]._id},
          {
              nombre: req.body.nombre,
              apellido: req.body.apellido,
              usuario: req.body.nombre + req.body.apellido,
              correo: req.body.correo,
          })
          .then(result=>{
            // 
          })
          .catch(error=>{
            res.send(error);
          });

        res.send({estatus: 1, mensaje: "Usuario autenticado con éxito"});
        
      } else {
        console.log("New User")
        var u = new Usuario({
          facebookId: req.body.facebookId,
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          usuario: req.body.nombre + req.body.apellido,
          correo: req.body.correo
        });
    
        u.save()
          .then(user=>{
            req.session.codigoUsuario = user._id;
            req.session.correoUsuario = user.correo;
            req.session.nombreUsuario = user.nombreUsuario;

            res.send({estatus: 1, mensaje: "Usuario nuevo autenticado con éxito"});
          })
          .catch(error=>{
            res.send(error);
          });
      }

    })
    .catch(error=>{
      res.send(error);
    });
};

// Se exportan las funciones
module.exports = {
  getUsuario,
  getUsuarios,
  saveUsuario,
  updateUsuario,
  deleteUsuario,
  fblogin,

  loginUsuario,
  usuarioLogeado,
  logoutUsuario,
  denegarUsuario
}
