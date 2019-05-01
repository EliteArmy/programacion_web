// Se exportan las configuraciones:
var servidor = "localhost:27017"
var nombreBaseDatos = "EditorDraco"

module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || `mongodb://${servidor}/${nombreBaseDatos}`,
  SECRET_TOKEN: 'MiTokenSecreto'
}
