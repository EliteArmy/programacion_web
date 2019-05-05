'use strict'

const express = require('express');

// Middleware de autenticación que nos permite proteger ciertas rutas
// De no estar autenticado, redirecciona al Login
const autenticar = require('../middlewares/autenticar')

// Se usa un router de express para las rutas
const apl = express.Router();

apl.get('/dash-carpeta.html', autenticar, function (res, req, next) {  
  res.redirect('/dash-carpeta.html') // Si esta autenticado, da permiso a la página
})

apl.get('/dash-proyecto.html', autenticar, function (res, req, next) {  
  res.redirect('/dash-proyecto.html') // Si esta autenticado, da permiso a la página
})

apl.get('/dash-archivo.html', autenticar, function (res, req, next) {  
  res.redirect('/dash-archivo.html')
})

apl.get('/editor.html', autenticar, function (res, req, next) {  
  res.redirect('/editor.html')
})

apl.get('/navbar-dashboard.html', autenticar, function (res, req, next) {  
  res.redirect('/navbar-dashboard.html')
})

apl.get('/sidebar.html', autenticar, function (res, req, next) {  
  res.redirect('/sidebar.html')
})

apl.get('/perfil.html', autenticar, function (res, req, next) {  
  res.redirect('/perfil.html')
})

apl.get('archivos/html.html', function (res, req, next) {  
  res.redirect('archivos/html.html')
})
/*
apl.get('*', function (req, res) {
	res.redirect('/login.html')
})
*/
module.exports = apl
