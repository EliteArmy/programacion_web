'use strict'

// Al no estar instalado por npm, se le debe indicar la ruta
const Carpeta = require('../modelos/carpeta');
var mongoose = require("mongoose");

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

// Generar las Carpetas de un usuario Loggeado
function getCarpetas (req, res) {
  Carpeta.find({usuarioCreador: req.session.codigoUsuario}, (err, carpetas) => {
    if (err) return res.status(500).send({ message: `Error al realizar la peticición: ${err}`})    
    
    if (!carpetas) return res.status(404).send({ message: `No Tienes Carpetas` })
    
    res.status(200).send({ carpetas })
  })
}

// Guardar una carpeta en la base de Datos
function saveCarpeta(req, res){
  //console.log('POST /api/carpeta') // Imprime en terminal
  //console.log(req.body) // gracias a bodyparser, ya viene parseado, viene como objeto json

  let carpeta = new Carpeta() // Carpeta es el modelo de la base de datos
  
  carpeta.nombre = req.body.nombre // req.body - tenemos todo el cuerpo de la cabecera
  carpeta.descripcion = req.body.descripcion
  carpeta.imagen = req.body.imagen
  carpeta.fechaCreacion = Date.now() // No almacena si no es de los previamente definidos
  
  //carpeta.carpetaId = req.body.carpetaId // Id carpeta a la cual pertenece, en caso de ser subcarpeta

  carpeta.subCarpeta = []
  carpeta.archivos = []
  carpeta.proyectos = []

  carpeta.estado = req.body.estado
  carpeta.usuarioCreador = req.session.codigoUsuario
  carpeta.compartido = []

  carpeta.save((err, carpetaStored) => {
    if (err) res.status(500).send({ message: `Error al salvar en la base de datos: ${err}`})
    
    // Devuelve los campos mas los que agrego mongo
    res.status(200).send({ carpeta: carpetaStored })
  })
}

// Guardar una Sub carpeta en la base de Datos
function saveSubCarpeta(req, res){
  console.log('POST api/carpeta/subcarpeta') // Imprime en terminal
  //console.log(req.body) // gracias a bodyparser, ya viene parseado, viene como objeto json

  let subCarp = new Carpeta() // Carpeta es el modelo de la base de datos
  
  subCarp.nombre = req.body.nombre // req.body - tenemos todo el cuerpo de la cabecera
  subCarp.descripcion = req.body.descripcion
  subCarp.imagen = req.body.imagen
  subCarp.fechaCreacion = Date.now() // No almacena si no es de los previamente definidos
  
  subCarp.carpetaRaizId = req.body.carpetaRaizId // Id carpeta a la cual pertenece, en caso de ser subcarpeta

  subCarp.subCarpeta = []
  subCarp.archivos = []
  subCarp.proyectos = []

  subCarp.estado = req.body.estado
  subCarp.usuarioCreador = req.session.codigoUsuario
  subCarp.compartido = []
/*
  subCarp.save()
    .then(subData=>{

      Carpeta.findOneAndUpdate({ _id: req.body.carpetaRaizId }, // Actualizar la carpeta raiz con la nueva carpeta creada
        {
          $push: { subCarpeta: mongoose.Types.ObjectId(subData._id) }
        }).then(data=>{
          res.send(data);
        })
        .catch(error=>{
            res.send(error); // En caso de error
        });

      res.send(subData);
    })
    .catch(error=>{
      res.send(error); // En caso de error
    });
*/
  subCarp.save()
    .then(subData=>{

      Carpeta.updateOne({ _id: req.body.carpetaRaizId }, // Actualizar la carpeta raiz con la nueva carpeta creada
        {
          $push: { subCarpeta: mongoose.Types.ObjectId(subData._id) }
        })
        .then(data=>{
          console.log("-------- 2. Carpeta: "+data) // data: [object Object]
          //res.send(data); // No se puede enviar datos desde aquí, si no el primero que hizo el llamado "subCarp.save()"
        })
        .catch(error=>{
          console.log("-------- 3. Error Carpeta: "+error)
          res.send(error); // En caso de error
        });
      console.log("-------- 1. SubCarpeta: "+subData) // Datos enviados al Ajax
      res.send(subData);
    
    })
    .catch(error=>{
      console.log(" No Hay Error -------- Error SubCarpeta: "+error)
      res.send(error); // En caso de error
    });

}

// Actualiza una carpeta en la base de datos
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

// Borrar una carpeta de la base
function deleteCarpeta (req, res) {
  let carpetaId = req.params.carpetaId

  Carpeta.findById(carpetaId, (err, carpeta) => {
    if (err) res.status(500).send({ message: `Error al borrar la carpeta: ${err}`})

    carpeta.remove(err => {
      if (err) res.status(500).send({ message: `Error al borrar la carpeta: ${err}`})
      
      res.status(200).send({ message: `La carpeta ha sido eliminada con éxito` })
    })

  })
}

// Se exportan las funciones
module.exports = {
  getCarpeta,
  getCarpetas,
  saveCarpeta,
  saveSubCarpeta,
  updateCarpeta,
  deleteCarpeta
}

