$(document).ready(function() {
  cargarDatos();
  generarArchivos();

  $(function () {
    $('[data-toggle="tooltip"]').tooltip({delay: { "show": 100, "hide": 100 }})
  });
  
});

$("#sidebar").load("sidebar.html", function() {
  //console.log("Sidebar fue cargado con exito.");
});

$("#nav-bar").load("navbar-dashboard.html", function() {
  //console.log("Navbar fue cargado con exito.");
});

function cargarDatos(){
  //console.log("Cargar los Datos del Usuario.")
   
  $.ajax({
    url: "/api/loged",
    method: "get",
    dataType: "json",
    success: function(response){
      //console.log(`Tamaño: ${response.length}`);
      //console.log(`Response: ${response}`);
      //console.log(`Nombre: ${response[0].nombreUsuario}`);  
      //console.log(`Correo: ${response[0].correo}`);
      
      if (response.length > 0){
        //console.log(`Se cargaron los datos de: ${response[0].nombreUsuario} con exito.`);
        $('#nombre-usuario').html(response[0].nombreUsuario)
        $('#nombre-usuario2').html(response[0].nombreUsuario)
      } else {
        // console.log("");
      }
    },
    error: function(err){
      console.log(err);
    }
  });
}

var informacionArchivos = [
  {nombre:'Archivo 01', descripcion:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, incidunt..'},
  {nombre:'Archivo 02', descripcion:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, incidunt..'},
  {nombre:'Archivo 03', descripcion:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, incidunt..'},
  {nombre:'Archivo 04', descripcion:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, incidunt..'},
  {nombre:'Archivo 05', descripcion:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, incidunt..'},
  {nombre:'Archivo 06', descripcion:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, incidunt..'}
];

console.log(informacionArchivos.length);

function generarArchivos(){
  
  document.getElementById('mostrar-archivos').innerHTML = "";
  
  for(var i=0; i<informacionArchivos.length; i++){
    document.getElementById('mostrar-archivos').innerHTML +=
    `<div id="${[i+1]}" class="form-group card-padding col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
      <div class="text-center card">
        <div class="card-body">
          <div class="row margin">
            <div class="col-2 padding">
            </div>
            <div class="col-8 padding">
              <h5 class="card-title">${informacionArchivos[i].nombre}</h5>
            </div>
            <div class="col-2 padding">
              <div class="float-right">
                <a href="#" data-toggle="tooltip" title="Editar Carpeta"><span class="far fa-edit text-success"></span></a>
                <a href="#" data-toggle="tooltip" title="Borrar Carpeta"><span class="far fa-trash-alt text-danger"></span></a>
              </div>
            </div>
          </div>
          <div>
            <a class="" href="editor.html"><span class="fas fa-file folder"></span></a>
          </div>
          <p class="card-text">${informacionArchivos[i].descripcion}</p>
        </div>
      </div>
    </div>`;
  }
}

function limpiarFormularioCarpeta(){
  //console.log('limpiar el formulario');
  $('#crearCarpeta').removeClass('d-none');
  $('#actualizarCarpeta').addClass('d-none');
  
  $('#crearProyecto').removeClass('d-none');
  $('#actualizarProyecto').addClass('d-none');
  
  $('#crearArchivo').removeClass('d-none');
  $('#actualizarArchivo').addClass('d-none');


  $('#carpetaNuevaTitulo').removeClass('d-none');
  $('#carpetaActualizarTitulo').addClass('d-none');

  $('#proyectoNuevoTitulo').removeClass('d-none');
  $('#proyectoActualizarTitulo').addClass('d-none');

  $('#archivoNuevoTitulo').removeClass('d-none');
  $('#archivoActualizarTitulo').addClass('d-none');


  $('#carpeta-id').val("");
  $('#carpeta-nombre').val("");
  $('#carpeta-descripcion').val("");
  $('#carpeta-imagen').val("");

  $('#proyecto-id').val("");
  $('#proyecto-nombre').val("");
  $('#proyecto-descripcion').val("");
  $('#proyecto-imagen').val("");

  $('#archivo-id').val("");
  $('#archivo-nombre').val("");
  $('#archivo-descripcion').val("");
  $('#archivo-imagen').val("");
}

/* Función que se encarga de dejar los campos por defecto */
$(document).on('click', '.reset', function(){
  limpiarFormularioCarpeta();
});