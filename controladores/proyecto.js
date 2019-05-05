'use strict'

// Al no estar instalado por npm, se le debe indicar la ruta
const Carpeta = require('../modelos/carpeta');
const Archivo = require('../modelos/archivo');
const Proyecto = require('../modelos/proyecto');
const mongoose = require("mongoose");


function getProyecto (req, res) {
  // params porque viene como parametro de la url
  let proyectoId = req.params.proyectoId // variable para guardar el id

  // Función Proyecto, que busque por ID (findById) de mongoose
  // y tambien recibe un callback, error si existiese y el proyecto si lo encuentra
  Proyecto.findById(proyectoId, (err, proyecto) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición getProyecto: ${err}`})
    
    // Si el proyecto no existe, se retorna este mensaje
    if(!proyecto) return res.status(404).send({ message: `El proyecto no existe`})
    
    res.status(200).send({ proyecto })
  })
}

function getProyectos (req, res) {
  Proyecto.find({ usuarioCreador: req.session.codigoUsuario }, (err, proyectos) => {
    if (err) return res.status(500).send({ message: `Error al realizar la peticición: ${err}`})    
    
    if (!proyectos) return res.status(404).send({ message: `No existen proyectos` })
    
    res.status(200).send({ proyectos })
  })
}

function editProyecto (req, res) {
  //console.log("Editar un Proyecto")
  
  let proyectoId = req.params.proyectoId // variable para guardar el id

  // Función Proyecto, que busque por ID (findById) de mongoose
  // y tambien recibe un callback, error si existiese y el proyecto si lo encuentra
  Proyecto.findById(proyectoId, (err, proyecto) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición Editar un Proyecto: ${err}`})
    
    // Si el proyecto no existe, se retorna este mensaje
    if(!proyecto) return res.status(404).send({ message: `El proyecto no existe`})
    
    //console.log(proyecto.archivoCSS);
    //console.log(proyecto.archivoHTML);
    //console.log(proyecto.archivoJS);

    //Establecer las variables de sesion
    //req.session.proyecto = proyectoId; // Sets del id del proyecto
    req.session.archivoCSS = proyecto.archivoCSS; // Sets del id del proyecto
    req.session.archivoHTML = proyecto.archivoHTML; // Sets del id del proyecto
    req.session.archivoJS = proyecto.archivoJS; // Sets del id del proyecto

    res.status(200).send({ proyecto })
  })
}

// Validación de si existen las variables de session
function cargarchkProyecto (req, res) {
  //console.log("cheque proyecto")
  if(req.session.archivoHTML){
    res.send({ estatus: 1, mensaje: "" });
  } else if (req.session.archivoJS) {
    res.send({ estatus: 1, mensaje: "" });
  } else {
    res.send({ estatus: 0, mensaje: "" });
  }
}

function cargarHTMLProyecto(req, res){
  //console.log("GET /proyecto/cargar")

  let html = req.session.archivoHTML;
  //console.log(html);

  Archivo.findById(html, (err, archivo) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición1: ${err}`})
    if(!archivo) return res.status(404).send({ message: `El proyecto no existe`})
    res.status(200).send({ archivo })
  })
}

function cargarCSSProyecto(req, res){
  //console.log("GET /proyecto/cargar")
  
  let css = req.session.archivoCSS;
  //console.log(css);

  Archivo.findById(css, (err, archivo) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición2: ${err}`})
    if(!archivo) return res.status(404).send({ message: `El proyecto no existe`})
    res.status(200).send({ archivo })
  })
}

function cargarJSProyecto(req, res){
  //console.log("GET /proyecto/cargar")

  let javascript = req.session.archivoJS;
  //console.log(javascript);

  Archivo.findById(javascript, (err, archivo) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición3: ${err}`})
    if(!archivo) return res.status(404).send({ message: `El proyecto no existe`})
    res.status(200).send({ archivo })
  })
}

function guardarProyecto(req, res){
  //console.log("post /proyecto/guardar")
  
  Archivo.findOne({ _id: req.body.id
  })
  .then(archivo=>{
    archivo.contenido = req.body.contenido;
    archivo.save()
    .then(data=>{
      //res.send(data);
    })
    .catch(error=>{
        res.send(data);
    });
    res.send(archivo);
  })
  .catch(error=>{
    res.send(error);
  });
}

function saveProyecto(req, res){
  //console.log('POST /api/proyecto')
  //console.log(req.body) // gracias a bodyparser, ya viene parseado, viene como objeto json

  // 1. Primero se crea un proyecto sin los arhivos que va a contener
  let proyecto = new Proyecto() // Proyecto es el modelo de la base de datos
  
  proyecto.nombre = req.body.nombre 
  proyecto.descripcion = req.body.descripcion
  proyecto.imagen = req.body.imagen
  proyecto.fechaCreacion = Date.now() // No almacena si no es de los previamente definidos
  
  if(req.body.carpetaRaizId){
    proyecto.carpetaRaizId = req.body.carpetaRaizId
  }  
  //proyecto.archivoCSS // Se guardan despues
  //proyecto.archivoHTML // Se guardan despues
  //proyecto.archivoJS // Se guardan despues

  proyecto.estado = req.body.estado
  proyecto.usuarioCreador = req.session.codigoUsuario
  proyecto.compartido = []

  proyecto.save()
    .then(proyData=>{

      // 2. Se agrega el id del proyecto creado a la carpeta Raiz
      Carpeta.updateOne({ _id: req.body.carpetaRaizId },
        {
          $push: { proyectos: mongoose.Types.ObjectId(proyData._id) }
        })
        .then(dataCarp=>{
          //console.log("dataCarp) // dataCarp: [object Object]
          //res.send(data); // No se puede enviar datos desde aquí, si no el primero que hizo el llamado "proyecto.save()"
        })
        .catch(error=>{
          console.log("Error1: " + error)
          res.send(error);
        });

      // 3. Se crean los 3 archivos que van a contener los proyectos
      var idHTML = mongoose.Types.ObjectId();
      var idCSS = mongoose.Types.ObjectId();
      var idJS = mongoose.Types.ObjectId();

      var archivoHTML = new Archivo ({
        _id: idHTML, 
        nombre: "html",
        descripcion: "Archivo HTML",
        imagen: "imagen.jpg",
        fechaCreacion: Date.now(),
        proyectoRaizId: mongoose.Types.ObjectId(proyData._id), // Se agrega el id del proyecto al arhivo
        contenido: "",
        extension: "html",
        usuarioCreador: req.session.codigoUsuario
      })

      var archivoCSS = new Archivo ({
        _id: idCSS, 
        nombre: "css",
        descripcion: "Archvio CSS",
        imagen: "imagen.jpg",
        fechaCreacion: Date.now(),
        proyectoRaizId: mongoose.Types.ObjectId(proyData._id), // Se agrega el id del proyecto al arhivo
        contenido: "",
        extension: "css",
        usuarioCreador: req.session.codigoUsuario
      })

      var archivoJS = new Archivo ({
        _id: idJS, 
        nombre: "javascript",
        descripcion: "Archivo javascript",
        imagen: "imagen.jpg",
        fechaCreacion: Date.now(),
        proyectoRaizId: mongoose.Types.ObjectId(proyData._id), // Se agrega el id del proyecto al arhivo
        contenido: "",
        extension: "js",
        usuarioCreador: req.session.codigoUsuario
      })

      // 4. Guarda los Archivos con el Id de el Proyecto
      archivoHTML.save();
      archivoCSS.save();
      archivoJS.save();

      // 5. Se agrega el id de los archivos a el proyecto Raiz
      Proyecto.updateOne({ _id: proyData._id }, // Actualizar el proyecto raiz con los nuevos archivos
        {
          $push: { 
            archivoCSS: idCSS,
            archivoHTML: idHTML,
            archivoJS: idJS
          }
        })
        .then(dataProy=>{
          //console.log("dataProy) // dataProy: [object Object]
          //res.send(data); // No se puede enviar datos desde aquí, si no el primero que hizo el llamado "proyecto.save()"
        })
        .catch(error=>{
          console.log("Error2: " + error)
          res.send(error); // En caso de error
        });
      res.send(proyData);
    
    })
    .catch(error=>{
      console.log("Error3" + error)
      res.send(error); // En caso de error
    });
}

function updateProyecto (req, res) {
  //console.log('PUT /api/proyecto')
  //console.log(req.body)
  
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
  editProyecto,
  cargarchkProyecto,
  cargarHTMLProyecto,
  cargarCSSProyecto,
  cargarJSProyecto,
  guardarProyecto,
  saveProyecto,
  updateProyecto,
  deleteProyecto
}
