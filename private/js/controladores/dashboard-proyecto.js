$(document).ready(function() {
  cargarDatos();
  generarProyectos();

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

function generarProyectos(){
  //console.log(`Generar los Proyectos:`);
  
  $.ajax({
		url: "/api/proyecto",
    method: "GET",
    dataType: "json",
    success: function(response){
      //console.log(response);
      //console.log(`Numero proyectos: ${response.proyectos.length}`);
      $('#numero-proyectos').html(response.proyectos.length)

      document.getElementById('mostrar-proyectos').innerHTML = "";
  
      for(var i=0; i<response.proyectos.length; i++){
        
        document.getElementById('mostrar-proyectos').innerHTML +=
        `<div id="${[i+1]}" class="form-group card-padding col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <div class="text-center card">
            <div class="card-body">
              <div class="row margin">
                
                <div class="text-left col-8 padding">
                  <h5 class="card-title ml-2">${response.proyectos[i].nombre}</h5>
                </div>

                <div class="col-4 padding">
                  <div class="float-right">
                    <a onclick="buscarProyecto('${response.proyectos[i]._id}')" data-toggle="modal" data-target="#crearNuevoProyecto" href="#" data-toggle="tooltip" title="Editar Proyecto"><span class="far fa-edit text-success"></span></a>
                    <a onclick="borrarProyecto('${response.proyectos[i]._id}')" href="#" data-toggle="tooltip" title="Borrar Proyecto"><span class="far fa-trash-alt text-danger"></span></a>
                  </div>
                </div>
              </div>
              <div>
                <a class="" onclick="editarProyecto('${response.proyectos[i]._id}')" href="#"><span class="fas fa-folder folder"></span></a>
              </div>
              <p class="card-text">${response.proyectos[i].descripcion}</p>
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

function buscarProyecto(id){
  //console.log("Buscar Proyecto");

  $.ajax({
    url: "/api/proyecto/"+id,
    method: "GET",
    dataType: "json",
    success: function(response){
      //console.log(`Nombre Proyecto: ${response.proyecto.nombre}`);
      $('#proyecto-id').val(response.proyecto._id);
      $('#proyecto-nombre').val(response.proyecto.nombre);
      $('#proyecto-descripcion').val(response.proyecto.descripcion);
      $('#proyecto-imagen').val(response.proyecto.imagen);
      //$('#crearNuevaProyecto').modal('show');

      $('#crearProyecto').addClass('d-none');
      $('#actualizarProyecto').removeClass('d-none');

      $('#proyectoNuevoTitulo').addClass('d-none');
      $('#proyectoActualizarTitulo').removeClass('d-none');

    },
    error: function(err){
      console.error(err);
    }
  });
}

function actualizarProyecto(){
  //console.log("Actualizar Proyecto: " + $('#proyecto-id').val());
  
  $.ajax({
    url: '/api/proyecto/'+$('#proyecto-id').val(),
    method: "PUT",
    dataType: "json",
    data: {
      "nombre": $('#proyecto-nombre').val(),
      "descripcion": $('#proyecto-descripcion').val(),
      "imagen": $('#proyecto-imagen').val(),
      "estado": "Activa"
    },
    success: function(response){
      console.log(`Nombre Proyecto: ${response.proyecto.nombre}`);

      // Mensajes Validos
      $.alert({
        title: '',
        content: `Proyecto "${response.proyecto.nombre}", actualizado con exito`,
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
      limpiarFormularioCarpeta();
    },
    error: function(err){
      console.error(err);
    }
  });
}

function borrarProyecto(id){
  console.log("Borrar Proyecto: " + $('#proyecto-id').val());
  
  $.confirm({
    title: '',
    content: '¿Está seguro de eliminar este proyecto?',
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
            url: '/api/proyecto/'+id,
            method: "DELETE",
            dataType: "json",
            success: function(response){
              //console.log(`Nombre Proyecto: ${response.message}`);
        
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

              generarProyectos();
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

function editarProyecto(id){
  //console.log("Editar Proyecto: " + $('#proyecto-id').val());
  //console.log("Editar Proyecto: " + id);

  $.ajax({
    url: '/api/proyecto/editar/'+id,
    method: "get",
    dataType: "json",
    success: function(response){
      //console.log('Se le va a redirigir');
      window.location = "editor.html"
      //console.log(response.proyecto.archivoCSS)
      //console.log(response.proyecto.archivoHTML)
      //console.log(response.proyecto.archivoJS)
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
