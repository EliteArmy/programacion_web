'use strict'

// Al no estar instalado por npm, se le debe indicar la ruta
const Archivo = require('../modelos/archivo');

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
  Archivo.find({}, (err, archivos) => {
    if (err) return res.status(500).send({ message: `Error al realizar la peticición: ${err}`})    
    if (!archivos) return res.status(404).send({ message: `No existen archivos` })
    res.status(200).send({ archivos })
  })
}

function saveArchivo(req, res){
  console.log('POST /api/archivo')
  console.log(req.body) // gracias a bodyparser, ya viene parseado, viene como objeto json

  let archivo = new Archivo() // Archivo es el modelo de la base de datos
  
  archivo.nombre = req.body.nombre // req.body - tenemos todo el cuerpo de la cabecera
  archivo.descripcion = req.body.descripcion
  archivo.contenido = req.body.contenido
  archivo.extension = req.body.extension // No almacena si no es de los previamente definidos
  archivo.fechaCreacion = req.body.fechaCreacion
  archivo.proyectoId = req.body.proyectoId
  archivo.carpetaId = req.body.carpetaId
  archivo.usuarioId = req.body.usuarioId
  archivo.estado = req.body.estado

  archivo.save((err, archivoStored) => {
    if (err) res.status(500).send({ message: `Error al salvar en la base de datos: ${err}`})
    
    // Devuelve los campos mas los que agrego mongo
    res.status(200).send({ archivo: archivoStored })
  })
}

function updateArchivo (req, res) {
  console.log('PUT /api/archivo')
  console.log(req.body)
  
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