$("#sidebar").load( "sidebar.html", function() {
  console.log( "Sidebar fue cargado con exito." );
});

$("#nav-bar").load( "navbar-dashboard.html", function() {
  console.log( "Navbar fue cargado con exito." );
});

$(document).ready(function() {
  cargarDatos();
  generarCarpetas();

  $(function () {
    $('[data-toggle="tooltip"]').tooltip({delay: { "show": 100, "hide": 100 }})
  });
  
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
        console.log(`Se cargaron los datos de: ${response[0].nombreUsuario} con exito.`);
        $('#nombre-usuario').html(response[0].nombreUsuario)
        $('#nombre-usuario2').html(response[0].nombreUsuario)
      } else {
        //window.location.href = "/login.html";
      }
    },
    error: function(err){
      console.log(err);
    }
  });

}

function generarCarpetas(){
  console.log(`Generar las carpetas:`);
  $.ajax({
		url: "/api/carpeta",
    method: "GET",
    dataType: "json",
    success: function(response){
      console.log(response);
      console.log(`Numero carpetas: ${response.carpetas.length}`);
      $('#numero-carpetas').html(response.carpetas.length)

      document.getElementById('mostrar-carpetas').innerHTML = "";
  
      for(var i=0; i<response.carpetas.length; i++){
        document.getElementById('mostrar-carpetas').innerHTML +=
        `<div id="${[i+1]}" class="form-group card-padding col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <div class="text-center card">
            <div class="card-body">
              <div class="row margin">
                
                <div class="text-left col-8 padding">
                  <h5 class="card-title ml-2">${response.carpetas[i].nombre}</h5>
                </div>

                <div class="col-4 padding">
                  <div class="float-right">
                  <i ></i>
                    <a onclick="crearTrabajo(${response.carpetas[i]._id})" data-toggle="modal" data-target="#crearNuevoTrabajo" href="#" data-toggle="tooltip" title="Nuevo Trabajo"><span class="far fa-plus-square text-info"></span></a>
                    <a onclick="editarCarpeta(${response.carpetas[i]._id})" data-toggle="modal" data-target="#crearNuevaCarpeta" href="#" data-toggle="tooltip" title="Editar Carpeta"><span class="far fa-edit text-success"></span></a>
                    <a onclick="borrarCarpeta(${response.carpetas[i]._id})" href="#" data-toggle="tooltip" title="Borrar Carpeta"><span class="far fa-trash-alt text-danger"></span></a>
                  </div>
                </div>
              </div>
              <div>
                <a class="" href="editor.html"><span class="fas fa-folder folder"></span></a>
              </div>
              <p class="card-text">${response.carpetas[i].descripcion}</p>
            </div>
          </div>
        </div>`;
      }

		},
		error: function(err){
      console.log(err);
		}
	});
}

// ============ Carpeta ============
function crearCarpeta(){
  console.log("Crear Carpeta");

  $.ajax({
    url: "/api/carpeta",
    method: "POST",
    dataType: "json",
    data: {
      "nombre": $('#carpeta-nombre').val(),
      "descripcion": $('#carpeta-descripcion').val(),
      "imagen": $('#carpeta-imagen').val(),
      "estado": "Activa"
    },
    success: function(response){
      console.log(`Nombre Carpeta: ${response.carpeta.nombre}`);

      // Mensajes Validos
      $.alert({
        title: '',
        content: `Carpeta "${response.carpeta.nombre}", creada con exito`,
        type: 'green',
        typeAnimated: true,
        icon: 'fas fa-check',
        closeIcon: true,
        closeIconClass: 'fas fa-times',
        autoClose: 'cerrar|5000', // Tiempo para cerrar el mensaje
        theme: 'modern', // Acepta propiedades CSS
        buttons: {
          cerrar: {
            text: 'Cerrar',
            btnClass: 'btn-success',
            keys: ['enter', 'shift']
          }
        }
      });

      $('#crearNuevaCarpeta').modal('hide');
      generarCarpetas();

    },
    error: function(err){
      console.error(err);
    }
  });

}

// ============ Proyecto ============
function crearProyecto(){
  console.log("Crear Proyecto");
  /*
  $.ajax({
    url: "/api/proyecto",
    method: "POST",
    dataType: "json",
    data: {
      "nombre": $('#proyecto-nombre').val(),
      "descripcion": $('#proyecto-descripcion').val(),
      "imagen": $('#proyecto-imagen').val(),
      "estado": "Activa"
    },
    success: function(response){
      //console.log(`Nombre Proyecto: ${response.proyecto.nombre}`);

      // Mensajes Validos
      $.alert({
        title: '',
        content: `Proyecto "${response.proyecto.nombre}", creado con exito`,
        type: 'green',
        typeAnimated: true,
        icon: 'fas fa-check',
        closeIcon: true,
        closeIconClass: 'fas fa-times',
        autoClose: 'cerrar|5000', // Tiempo para cerrar el mensaje
        theme: 'modern', // Acepta propiedades CSS
        buttons: {
          cerrar: {
            text: 'Cerrar',
            btnClass: 'btn-success',
            keys: ['enter', 'shift']
          }
        }
      });

      $('#crearNuevoProyecto').modal('hide');
      generarProyectos();
    },
    error: function(err){
      console.error(err);
    }
  });
  */
}

// ============ Archivo ============
function crearArchivo(){
  console.log("Crear Archivo");
  /*
  $.ajax({
    url: "/api/archivo",
    method: "POST",
    dataType: "json",
    data: {
      "nombre": $('#archivo-nombre').val(),
      "descripcion": $('#archivo-descripcion').val(),
      "imagen": $('#archivo-imagen').val(),
      "estado": "Activa"
    },
    success: function(response){
      //console.log(`Nombre Archivo: ${response.archivo.nombre}`);

      // Mensajes Validos
      $.alert({
        title: '',
        content: `Archivo "${response.archivo.nombre}", creado con exito`,
        type: 'green',
        typeAnimated: true,
        icon: 'fas fa-check',
        closeIcon: true,
        closeIconClass: 'fas fa-times',
        autoClose: 'cerrar|5000', // Tiempo para cerrar el mensaje
        theme: 'modern', // Acepta propiedades CSS
        buttons: {
          cerrar: {
            text: 'Cerrar',
            btnClass: 'btn-success',
            keys: ['enter', 'shift']
          }
        }
      });
      $('#crearNuevoArchivo').modal('hide');
      generarArchivos();
    },
    error: function(err){
      console.error(err);
    }
  });
  */
}

