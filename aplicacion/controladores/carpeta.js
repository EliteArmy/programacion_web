'use strict'

// Al no estar instalado por npm, se le debe indicar la ruta
const Carpeta = require('../modelos/carpeta');

function getCarpeta (req, res) {
  // params porque viene como parametro de la url
  let carpetaId = req.params.carpetaId // variable para guardar el id

  // Función Carpeta, que busque por ID (findById) de mongoose
  // y tambien recibe un callback, error si existiese y el carpeta si lo encuentra
  Carpeta.findById(carpetaId, (err, carpeta) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}`})
    
    // Si la carpeta no existe, se retorna este mensaje
    if(!carpeta) return res.status(404).send({ message: `la carpeta no existe`})
    
    res.status(200).send({ carpeta })
  })
}

function getCarpetas (req, res) {
  Carpeta.find({}, (err, carpetas) => {
    if (err) return res.status(500).send({ message: `Error al realizar la peticición: ${err}`})    
    if (!carpetas) return res.status(404).send({ message: `No existen carpetas` })
    res.status(200).send({ carpetas })
  })
}

function saveCarpeta(req, res){
  console.log('POST /api/carpeta')
  console.log(req.body) // gracias a bodyparser, ya viene parseado, viene como objeto json

  let carpeta = new Carpeta() // Carpeta es el modelo de la base de datos
  
  carpeta.nombre = req.body.nombre // req.body - tenemos todo el cuerpo de la cabecera
  carpeta.descripcion = req.body.descripcion
  carpeta.imagen = req.body.imagen
  carpeta.fechaCreacion = req.body.fechaCreacion // No almacena si no es de los previamente definidos
  carpeta.carpetaId = req.body.carpetaId
  carpeta.usuarioId = req.body.usuarioId
  carpeta.estado = req.body.estado

  carpeta.save((err, carpetaStored) => {
    if (err) res.status(500).send({ message: `Error al salvar en la base de datos: ${err}`})
    
    // Devuelve los campos mas los que agrego mongo
    res.status(200).send({ carpeta: carpetaStored })
  })
}

function updateCarpeta (req, res) {
  console.log('PUT /api/carpeta')
  console.log(req.body)
  
  let carpetaId = req.params.carpetaId
  let update = req.body

  Carpeta.findByIdAndUpdate(carpetaId, update, (err, carpetaUpdated) => {
    if (err) res.status(500).send({ message: `Error al actualizar la carpeta: ${err}`})

    res.status(200).send({ carpeta: carpetaUpdated })
  })
}

function deleteCarpeta (req, res) {
  let carpetaId = req.params.carpetaId

  Carpeta.findById(carpetaId, (err, carpeta) => {
    if (err) res.status(500).send({ message: `Error al borrar la carpeta: ${err}`})

    carpeta.remove(err => {
      if (err) res.status(500).send({ message: `Error al borrar la carpeta: ${err}`})
      
      res.status(200).send({ message: `La carpeta ha sido eliminado` })
    })

  })
}

// Se exportan las funciones
module.exports = {
  getCarpeta,
  getCarpetas,
  saveCarpeta,
  updateCarpeta,
  deleteCarpeta
}

