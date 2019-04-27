'use strict'

// Al no estar instalado por npm, se le debe indicar la ruta
const Proyecto = require('../modelos/proyecto');

function getProyecto (req, res) {
  // params porque viene como parametro de la url
  let proyectoId = req.params.proyectoId // variable para guardar el id

  // Función Proyecto, que busque por ID (findById) de mongoose
  // y tambien recibe un callback, error si existiese y el proyecto si lo encuentra
  Proyecto.findById(proyectoId, (err, proyecto) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}`})
    
    // Si el proyecto no existe, se retorna este mensaje
    if(!proyecto) return res.status(404).send({ message: `El proyecto no existe`})
    
    res.status(200).send({ proyecto })
  })
}

function getProyectos (req, res) {
  Proyecto.find({}, (err, proyectos) => {
    if (err) return res.status(500).send({ message: `Error al realizar la peticición: ${err}`})    
    if (!proyectos) return res.status(404).send({ message: `No existen proyectos` })
    res.status(200).send({ proyectos })
  })
}

function saveProyecto(req, res){
  console.log('POST /api/proyecto')
  console.log(req.body) // gracias a bodyparser, ya viene parseado, viene como objeto json

  let proyecto = new Proyecto() // Proyecto es el modelo de la base de datos
  
  proyecto.nombre = req.body.nombre // req.body - tenemos todo el cuerpo de la cabecera
  proyecto.descripcion = req.body.descripcion
  proyecto.imagen = req.body.imagen
  proyecto.fechaCreacion = req.body.category // No almacena si no es de los previamente definidos
  proyecto.carpetaId = req.body.carpetaId
  proyecto.usuarioId = req.body.usuarioId
  proyecto.estado = req.body.estado

  proyecto.save((err, proyectoStored) => {
    if (err) res.status(500).send({ message: `Error al salvar en la base de datos: ${err}`})
    
    // Devuelve los campos mas los que agrego mongo
    res.status(200).send({ proyecto: proyectoStored })
  })
}

function updateProyecto (req, res) {
  console.log('PUT /api/proyecto')
  console.log(req.body)
  
  let proyectoId = req.params.proyectoId
  let update = req.body

  Proyecto.findByIdAndUpdate(proyectoId, update, (err, proyectoUpdated) => {
    if (err) res.status(500).send({ message: `Error al actualizar el proyecto: ${err}`})

    res.status(200).send({ proyecto: proyectoUpdated })
  })
}

function deleteProyecto (req, res) {
  let proyectoId = req.params.proyectoId

  Proyecto.findById(proyectoId, (err, proyecto) => {
    if (err) res.status(500).send({ message: `Error al borrar el proyecto: ${err}`})

    proyecto.remove(err => {
      if (err) res.status(500).send({ message: `Error al borrar el proyecto: ${err}`})
      
      res.status(200).send({ message: `El proyecto ha sido eliminado` })
    })

  })
}

// Se exportan las funciones
module.exports = {
  getProyecto,
  getProyectos,
  saveProyecto,
  updateProyecto,
  deleteProyecto
}

