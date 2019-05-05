'use strict'

// Al no estar instalado por npm, se le debe indicar la ruta
const Carpeta = require('../modelos/carpeta');
const Archivo = require('../modelos/archivo');
const mongoose = require("mongoose");

function getArchivo (req, res) {
  // params porque viene como parametro de la url
  let archivoId = req.params.archivoId // variable para guardar el id

  // Función Archivo, que busque por ID (findById) de mongoose
  // y tambien recibe un callback, error si existiese y el archivo si lo encuentra
  Archivo.findById(archivoId, (err, archivo) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}`})
    
    // Si el archivo no existe, se retorna este mensaje
    if(!archivo) return res.status(404).send({ message: `El archivo no existe`})
    
    res.status(200).send({ archivo })
  })
}

function getArchivos (req, res) {
  //console.log("GET /archivo")
  Archivo.find({}, (err, archivos) => {
    if (err) return res.status(500).send({ message: `Error al realizar la peticición: ${err}`})    
    if (!archivos) return res.status(404).send({ message: `No existen archivos` })
    //console.log(archivos)
    res.status(200).send({ archivos })
  })
}

function saveArchivo(req, res){
  console.log('POST /api/archivo')
  //console.log(req.body) // gracias a bodyparser, ya viene parseado, viene como objeto json

  let archivo = new Archivo() // Archivo es el modelo de la base de datos
  
  archivo.nombre = req.body.nombre // req.body - tenemos todo el cuerpo de la cabecera
  archivo.descripcion = req.body.descripcion
  archivo.imagen = req.body.imagen
  archivo.fechaCreacion = Date.now() // No almacena si no es de los previamente definidos

  archivo.carpetaRaizId = req.body.carpetaRaizId // Id Carpeta a la cual puede pertenecer
  //archivo.proyectoRaizId = req.body.proyectoRaizId // Id Proyecto al cual puede pertenecer

  archivo.contenido = req.body.contenido // Id Carpeta a la cual puede pertenecer
  archivo.extension = req.body.extension // No almacena si no es de los previamente definidos
  
  archivo.estado = req.body.estado
  archivo.usuarioCreador = req.session.codigoUsuario
  archivo.compartido = []  

  archivo.save()
    .then(dataArhivo=>{

      Carpeta.updateOne({ _id: req.body.carpetaRaizId },
        {
          $push: { archivos: mongoose.Types.ObjectId(dataArhivo._id) }
        })
        .then(data=>{
          //res.send(data); // No se puede enviar datos desde aquí, si no el primero que hizo el llamado "archivo.save()"
        })
        .catch(error=>{
          console.log("--- 3. Error Carpeta: " + error)
          res.send(error); // En caso de error
        })
      
      console.log("--- 1. Archivo: " + dataArhivo) // Datos enviados al Ajax
      res.send(dataArhivo);
    })  
    .catch(error=>{
      console.log("Error Archivo: " + error)
      res.send(error);
    });

  /*
  archivo.save((err, archivoStored) => {
    if (err) res.status(500).send({ message: `Error al salvar en la base de datos: ${err}`})
    
    // Devuelve los campos mas los que agrego mongo
    res.status(200).send({ archivo: archivoStored })
  })
  */
}

function updateArchivo (req, res) {
  //console.log('PUT /api/archivo')
  //console.log(req.body)
  
  let archivoId = req.params.archivoId
  let update = req.body

  Archivo.findByIdAndUpdate(archivoId, update, (err, archivoUpdated) => {
    if (err) res.status(500).send({ message: `Error al actualizar el archivo: ${err}`})

    res.status(200).send({ archivo: archivoUpdated })
  })
}

function deleteArchivo (req, res) {
  let archivoId = req.params.archivoId

  Archivo.findById(archivoId, (err, archivo) => {
    if (err) res.status(500).send({ message: `Error al borrar el archivo: ${err}`})

    archivo.remove(err => {
      if (err) res.status(500).send({ message: `Error al borrar el archivo: ${err}`})
      
      res.status(200).send({ message: `El archivo ha sido eliminado` })
    })

  })
}

// Se exportan las funciones
module.exports = {
  getArchivo,
  getArchivos,
  saveArchivo,
  updateArchivo,
  deleteArchivo
}
