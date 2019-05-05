// Para agregar seguridad a una ruta especifica, esta función sería llamada desde alguna peticion.
function verificarAutenticacion (req, res, next){
	if(req.session.correoUsuario)
		return next();
	else
     res.redirect('/login.html');
}

module.exports = verificarAutenticacion
