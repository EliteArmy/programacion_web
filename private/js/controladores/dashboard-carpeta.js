$(document).ready(function() {
  cargarDatos();
  generarCarpetas();

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

function generarCarpetas(){
  //console.log(`Generar las carpetas:`);
  $.ajax({
		url: "/api/carpeta",
    method: "GET",
    dataType: "json",
    success: function(response){
      //console.log(response);
      //console.log(`Numero carpetas: ${response.carpetas.length}`);
      
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

                    <div class="dropdown">
                      <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="far fa-plus-square text-info"></span>
                      </a>
                  
                      <div class="dropdown-menu">
                        <!--<h6 class="dropdown-header">Crear Nuevo:</h6>-->
                        <a class="dropdown-item disabled" href="#">Crear Nuevo:</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" onclick="buscarCarpeta('${response.carpetas[i]._id}')" data-toggle="modal" data-target="#crearNuevoArchivo" href="#">Archivo</a>
                        <a class="dropdown-item" onclick="buscarCarpeta('${response.carpetas[i]._id}')" data-toggle="modal" data-target="#crearNuevoProyecto" href="#">Proyecto</a>
                        <a class="dropdown-item" onclick="buscarCarpeta('${response.carpetas[i]._id}')" data-toggle="modal" data-target="#crearNuevaCarpeta" href="#">Carpeta</a>
                      </div>
                    </div>

                    <a onclick="buscarCarpeta('${response.carpetas[i]._id}')" data-toggle="modal" data-target="#crearNuevaCarpeta" href="#" data-toggle="tooltip" title="Editar Carpeta"><span class="far fa-edit text-success"></span></a>
                    <a onclick="borrarCarpeta('${response.carpetas[i]._id}')" href="#" data-toggle="tooltip" title="Borrar Carpeta"><span class="far fa-trash-alt text-danger"></span></a>
                  </div>
                </div>
              </div>
              <div>
                <a class="" onclick="buscarContenidoCarpeta('${response.carpetas[i]._id}')" href="#"><span class="fas fa-folder folder"></span></a>
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

function crearSubCarpeta(){
  //console.log("Crear Sub Carpeta: " + $('#carpeta-id').val());

  $.ajax({
    url: "/api/carpeta/subcarpeta",
    method: "POST",
    dataType: "json",
    data: {
      "nombre": $('#carpeta-nombre').val(),
      "descripcion": $('#carpeta-descripcion').val(),
      "imagen": $('#carpeta-imagen').val(),
      "carpetaRaizId": $('#carpeta-id').val(),
      "estado": "Activa"
    },
    success: function(response){
      console.log(`Nombre Carpeta: ${response.nombre}`);

      // Mensajes Validos
      $.alert({
        title: '',
        content: `Sub Carpeta "${response.nombre}", creada con exito`,
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

function buscarCarpeta(id){
  console.log("Buscar Carpeta");

  $.ajax({
    url: "/api/carpeta/"+id,
    method: "GET",
    dataType: "json",
    success: function(response){
      //console.log(`Nombre Carpeta: ${response.carpeta.nombre}`);
      $('#carpeta-id').val(response.carpeta._id);
      $('#carpeta-nombre').val(response.carpeta.nombre);
      $('#carpeta-descripcion').val(response.carpeta.descripcion);
      $('#carpeta-imagen').val(response.carpeta.imagen);
      //$('#crearNuevaCarpeta').modal('show');

      $('#crearCarpeta').addClass('d-none');
      $('#actualizarCarpeta').removeClass('d-none');

      $('#carpetaNuevaTitulo').addClass('d-none');
      $('#carpetaActualizarTitulo').removeClass('d-none');

    },
    error: function(err){
      console.error(err);
    }
  });
}


function buscarContenidoCarpeta(id){

  console.log("Buscar Contenido Carpeta: " + id);
  //document.getElementById('mostrar-carpetas').innerHTML = "";

  // Busca las carpetas dentro de la carpeta padre
  $.ajax({
    url: "/api/carpeta/contenido/carpetas",
    method: "POST",
    dataType: "json",
    data: {
      "carpetaRaizId": id
    },
    success: function(response){
      //for(var i=0; i<response.carpetas.length; i++){
        //document.getElementById('mostrar-carpetas').innerHTML +=``;
      //}
    },
    error: function(err){
      console.error(err);
    }
  });

  // Busca los proyectos de la carpeta padre
  $.ajax({
    url: "/api/carpeta/contenido/proyectos",
    method: "POST",
    dataType: "json",
    data: {
      "carpetaRaizId": id
    },
    success: function(response){
      //for(var i=0; i<response.proyectos.length; i++){
        //document.getElementById('mostrar-carpetas').innerHTML +=``;
      //}
    },
    error: function(err){
      console.error(err);
    }
  });

  // Busca los arhivos de la carpeta padre
  $.ajax({
    url: "/api/carpeta/contenido/archivos",
    method: "POST",
    dataType: "json",
    data: {
      "carpetaRaizId": id
    },
    success: function(response){
      //for(var i=0; i<response.archivos.length; i++){
        //document.getElementById('mostrar-carpetas').innerHTML +=``;
      //}
    },
    error: function(err){
      console.error(err);
    }
  });

}


function actualizarCarpeta(){
  //console.log("Actualizar Carpeta: " + $('#carpeta-id').val());
  
  $.ajax({
    url: '/api/carpeta/'+$('#carpeta-id').val(),
    method: "PUT",
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
        content: `Carpeta "${response.carpeta.nombre}", actualizada con exito`,
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
      limpiarFormulario();
    },
    error: function(err){
      console.error(err);
    }
  });
}

function borrarCarpeta(id){
  console.log("Borrar Carpeta: " + $('#carpeta-id').val());
  
  $.confirm({
    title: '',
    content: '¿Está seguro de eliminar esta carpeta?',
    type: 'orange',
    typeAnimated: true,
    icon: 'fa fa-trash',
    theme: 'modern',
    closeIcon: true,
    closeIconClass: 'fas fa-times',
    buttons: {
      
      Eliminar: {
        text: "¡Si, Seguro!",
        btnClass: "btn-warning",
        action: function(){
          $.ajax({
            url: '/api/carpeta/'+id,
            method: "DELETE",
            dataType: "json",
            success: function(response){
              //console.log(`Nombre Carpeta: ${response.message}`);
        
              // Mensajes Validos
              $.alert({
                title: '',
                content: `${response.message}`,
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
        
              generarCarpetas();
        
            },
            error: function(error){
              console.error(error);
            }
          });
        }
      },
      Cancelar: function(){
        // --
      }
    }
  })
}

function limpiarFormularioCarpeta(){
  console.log('limpiar el formulario');
  $('#crearCarpeta').removeClass('d-none');
  $('#actualizarCarpeta').addClass('d-none');

  $('#carpetaNuevaTitulo').removeClass('d-none');
  $('#carpetaActualizarTitulo').addClass('d-none');

  $('#carpeta-id').val("");
  $('#carpeta-nombre').val("");
  $('#carpeta-descripcion').val("");
  $('#carpeta-imagen').val("");
}

/* Función que se encarga de dejar los campos por defecto */
$(document).on('click','.reset', function(){
  limpiarFormularioCarpeta();
});

// ============ Proyecto ============
function crearProyecto(){
  console.log("Crear Proyecto");
  
  $.ajax({
    url: "/api/proyecto",
    method: "POST",
    dataType: "json",
    data: {
      "carpetaRaizId": $('#carpeta-id').val(),
      "nombre": $('#proyecto-nombre').val(),
      "descripcion": $('#proyecto-descripcion').val(),
      "imagen": $('#proyecto-imagen').val(),
      "estado": "Activa"
    },
    success: function(response){
      console.log(`Nombre Proyecto: ${response.nombre}`);

      // Mensajes Validos
      $.alert({
        title: '',
        content: `Proyecto "${response.nombre}", creado con exito`,
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
      //generarProyectos();
    },
    error: function(err){
      console.error(err);
    }
  });
  
}

// ============ Archivo ============
function crearArchivo(){
  console.log("Crear Archivo: " + $('#carpeta-id').val());
  
  $.ajax({
    url: "/api/archivo",
    method: "POST",
    dataType: "json",
    data: {
      "nombre": $('#archivo-nombre').val(),
      "descripcion": $('#archivo-descripcion').val(),
      "imagen": $('#archivo-imagen').val(),
      "carpetaRaizId": $('#carpeta-id').val(),
      "contenido": $('#archivo-contenido').val(),
      "extension": $('#slc-tipo-extension').val(),
      "estado": "Activa"
    },
    success: function(response){
      //console.log(`Nombre Archivo: ${response.nombre}`);

      // Mensajes Validos
      $.alert({
        title: '',
        content: `Archivo "${response.nombre}", creado con exito`,
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
      //generarArchivos();
    },
    error: function(err){
      console.error(err);
    }
  });
  
}

