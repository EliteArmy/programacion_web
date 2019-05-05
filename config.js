// Se exportan las configuraciones:
var servidor = "localhost:27017"
var nombreBaseDatos = "EditorDraco"
const uri = "mongodb+srv://ariel:DarkMetagross095!!@cluster0-1macw.mongodb.net/test?retryWrites=true";

module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || `mongodb://${servidor}/${nombreBaseDatos}` || uri
}
