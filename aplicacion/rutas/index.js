'use strict'

const express = require('express');

const usuarioCtrl = require('../controladores/usuario')

const carpetaCtrl = require('../controladores/carpeta')
const proyectoCtrl = require('../controladores/proyecto')
const archivoCtrl = require('../controladores/archivo')

// Middleware de autenticación que nos permite proteger ciertas rutas
const autenticar = require('../middlewares/autenticar')

// Se usa un router de express para las rutas
const api = express.Router();

// ==================== PETICIONES DE USUARIO ====================
// === Petición de tipo GET que devuelve todos los Recursos de la base:
api.get('/usuario', usuarioCtrl.getUsuarios)

// === Petición de tipo GET para un único recurso en concreto:
api.get('/usuario/:usuarioId', usuarioCtrl.getUsuario)

// === Petición de tipo POST para Insertar nuevos recursos: 
api.post('/usuario', usuarioCtrl.saveUsuario)

// === Petición de tipo PUT para Actualizar un único recurso:
api.put('/usuario/:usuarioId', usuarioCtrl.updateUsuario)

// === Petición de tipo DELETE para Borrar un único recurso:
api.delete('/usuario/:usuarioId', usuarioCtrl.deleteUsuario)

// ================== PETICIONES AUTENTICACIÓN ==================
api.post('/login', usuarioCtrl.loginUsuario) // app.post("/login", function(req, res){}

api.get('/loged', usuarioCtrl.usuarioLogeado) // app.get("/loged", function(req, res){}
 
api.post('/registro', usuarioCtrl.saveUsuario) // app.post("/registro", function(req, res){}

api.post('/logout', usuarioCtrl.logoutUsuario) // app.post("/logout", function(req, res){}

// ==================== PETICIONES DE CARPETA ====================
api.get('/carpeta', carpetaCtrl.getCarpetas)

api.get('/carpeta/:carpetaId', carpetaCtrl.getCarpeta)

api.post('/carpeta', carpetaCtrl.saveCarpeta)

api.post('/carpeta/subcarpeta', carpetaCtrl.saveSubCarpeta)

api.post('/carpeta/contenido/carpetas', carpetaCtrl.obtenerContenidoCarpeta) // --
api.post('/carpeta/contenido/proyectos', carpetaCtrl.obtenerContenidoProyecto) // --
api.post('/carpeta/contenido/archivos', carpetaCtrl.obtenerContenidoArchivos) // --

api.put('/carpeta/:carpetaId', carpetaCtrl.updateCarpeta)

api.delete('/carpeta/:carpetaId', carpetaCtrl.deleteCarpeta)

// ==================== PETICIONES DE PROYECTO ====================
api.get('/proyecto', proyectoCtrl.getProyectos)

//api.get('/proyecto/:proyectoId', proyectoCtrl.getProyecto)

api.get('/proyecto/editar/:proyectoId', proyectoCtrl.editProyecto) // Editar Archivos de Proyecto

api.get('/proyecto/cargarchk', proyectoCtrl.cargarchkProyecto) // Cargar Archivos de Proyecto
api.get('/proyecto/cargarhtlm', proyectoCtrl.cargarHTMLProyecto) // Cargar Archivos de Proyecto
api.get('/proyecto/cargarcss', proyectoCtrl.cargarCSSProyecto) // Cargar Archivos de Proyecto
api.get('/proyecto/cargarjs', proyectoCtrl.cargarJSProyecto) // Cargar Archivos de Proyecto

api.post('/proyecto/guardar', proyectoCtrl.guardarProyecto) // Guardar Archivos de Proyecto

api.post('/proyecto', proyectoCtrl.saveProyecto) // Crear Proyecto

api.put('/proyecto/:proyectoId', proyectoCtrl.updateProyecto)

api.delete('/proyecto/:proyectoId', proyectoCtrl.deleteProyecto)

// ==================== PETICIONES DE ARCHIVO ====================
api.get('/archivo', archivoCtrl.getArchivos)

api.get('/archivo/:archivoId', archivoCtrl.getArchivo)

api.post('/archivo/', archivoCtrl.saveArchivo)

api.put('/archivo/:archivoId', archivoCtrl.updateArchivo)

api.delete('/archivo/:archivoId', archivoCtrl.deleteArchivo)

// ===================== PETICIONES PRUEBA  =====================
// La siguiente es una peticion restringida, se envia una funcion midleware que verifica si esta autenticadoo no.
api.get('/peticion-registringida', autenticar, usuarioCtrl.denegarUsuario)

// Antes de llamar function(req, res){}, se pueden poner tantas funciones como se desee.
api.get('/privada', autenticar, function (req, res){
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api
