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

function generarArchivos(){
  
  $.ajax({
		url: "/api/archivo",
    method: "GET",
    dataType: "json",
    success: function(response){
      //console.log(response);
      //console.log(`Numero archivos: ${response.archivos.length}`);
      $('#numero-archivos').html(response.archivos.length)

      document.getElementById('mostrar-archivos').innerHTML = "";
  
      for(var i=0; i<response.archivos.length; i++){
        
        document.getElementById('mostrar-archivos').innerHTML +=
        `<div id="${[i+1]}" class="form-group card-padding col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <div class="text-center card">
            <div class="card-body">
              <div class="row margin">
                
                <div class="text-left col-8 padding">
                  <h5 class="card-title ml-2">${response.archivos[i].nombre}</h5>
                </div>

                <div class="col-4 padding">
                  <div class="float-right">
                    <a id="buscar" onclick="buscarArchivo('${response.archivos[i]._id}')" data-toggle="modal" data-target="#crearNuevoArchivo" href="#" data-toggle="tooltip" title="Editar Archivo"><span class="far fa-edit text-success"></span></a>
                    <a onclick="borrarArchivo('${response.archivos[i]._id}')" href="#" data-toggle="tooltip" title="Borrar Archivo"><span class="far fa-trash-alt text-danger"></span></a>
                  </div>
                </div>
              </div>
              <div>
                <a class="" onclick="editarArchivo('${response.archivos[i]._id}')" href="#"><span class="fas fa-folder folder"></span></a>
              </div>
              <p class="card-text">${response.archivos[i].descripcion}</p>
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

function buscarArchivo(id){
  //console.log("Buscar Archivo");
  //$('.selectpicker').selectpicker('val', '');
  //$('.selectpicker').selectpicker('refresh');

  $.ajax({
    url: "/api/archivo/"+id,
    method: "GET",
    dataType: "json",
    success: function(response){
      //console.log(`Nombre Archivo: ${response.archivo.nombre}`);
      //console.log(`Extensión Archivo: ${response.archivo.extension}`);
      $('#archivo-id').val(response.archivo._id);
      $('#archivo-nombre').val(response.archivo.nombre);
      $('#archivo-descripcion').val(response.archivo.descripcion);
      $('#archivo-imagen').val(response.archivo.imagen);
      $('#archivo-extension').val(response.archivo.extension);
      $('#slc-tipo-extension').selectpicker('val', response.archivo.extension);
      $('#archivo-contenido').val(response.archivo.contenido);
      //$('#crearNuevoArchivo').modal('show');

      $('#crearArchivo').addClass('d-none');
      $('#actualizarArchivo').removeClass('d-none');

      $('#archivoNuevoTitulo').addClass('d-none');
      $('#archivoActualizarTitulo').removeClass('d-none');

      $('#extension').removeClass('d-none');

      $('.selectpicker').selectpicker('refresh');
      $('.selectpicker').selectpicker('render');

      /*$(document).on('click', '#buscar', function(){
        $('.selectpicker ').selectpicker('refresh');
      });*/
    },
    error: function(err){
      console.error(err);
    }
  });
}

function actualizarArchivo(){
  //console.log("Actualizar Archivo: " + $('#archivo-id').val());
  
  $.ajax({
    url: '/api/archivo/'+$('#archivo-id').val(),
    method: "PUT",
    dataType: "json",
    data: {
      "nombre": $('#archivo-nombre').val(),
      "descripcion": $('#archivo-descripcion').val(),
      "imagen": $('#archivo-imagen').val(),
      "contenido": $('#archivo-contenido').val(),
      "extension": $('#slc-tipo-extension').val(),
      "estado": "Activa"
    },
    success: function(response){
      //console.log(`Nombre Archivo: ${response.archivo.nombre}`);

      // Mensajes Validos
      $.alert({
        title: '',
        content: `Archivo "${response.archivo.nombre}", actualizado con exito`,
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
      limpiarFormularioCarpeta();
    },
    error: function(err){
      console.error(err);
    }
  });
}

function borrarArchivo(id){
  //console.log("Borrar Archivo: " + $('#archivo-id').val());
  
  $.confirm({
    title: '',
    content: '¿Está seguro de eliminar este archivo?',
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
            url: '/api/archivo/'+id,
            method: "DELETE",
            dataType: "json",
            success: function(response){
              //console.log(`Nombre Archivo: ${response.message}`);
        
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

              generarArchivos();
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

// ============ Proyecto ============
function crearProyecto(){
  //console.log("Crear Proyecto");
  
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
      //console.log(`Nombre Proyecto: ${response.nombre}`);

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

// ============ Carpeta ============
function crearCarpeta(){
  //console.log("Crear Carpeta");

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
      //console.log(`Nombre Carpeta: ${response.carpeta.nombre}`);

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

    },
    error: function(err){
      console.error(err);
    }
  });
}

function limpiarFormularioCarpeta(){
  //console.log('limpiar el formulario');
  $('#crearCarpeta').removeClass('d-none');
  $('#actualizarCarpeta').addClass('d-none');
  $('#crearSubCarpeta').addClass('d-none');
  
  $('#crearProyecto').removeClass('d-none');
  $('#actualizarProyecto').addClass('d-none');
  
  $('#crearArchivo').removeClass('d-none');
  $('#actualizarArchivo').addClass('d-none');


  $('#carpetaNuevaTitulo').removeClass('d-none');
  $('#carpetaActualizarTitulo').addClass('d-none');
  $('#carpetaSubTitulo').addClass('d-none');

  $('#proyectoNuevoTitulo').removeClass('d-none');
  $('#proyectoActualizarTitulo').addClass('d-none');

  $('#archivoNuevoTitulo').removeClass('d-none');
  $('#archivoActualizarTitulo').addClass('d-none');

  $('#extension').addClass('d-none');

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