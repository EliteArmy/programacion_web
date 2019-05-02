// Para agregar seguridad a una ruta especifica, esta función sería llamada desde alguna peticion.
function verificarAutenticacion (req, res, next){
	if(req.session.correoUsuario)
		return next();
	else
		res.send("ERROR, ACCESO NO AUTORIZADO");
}

module.exports = verificarAutenticacion
