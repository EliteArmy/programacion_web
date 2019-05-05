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

                    <div class="dropdown">
                      <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="far fa-plus-square text-info"></span>
                      </a>
                  
                      <div class="dropdown-menu">
                        <!--<h6 class="dropdown-header">Crear Nuevo:</h6>-->
                        <a class="dropdown-item disabled" href="#">Crear Nuevo:</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" onclick="buscarCarpeta('${response.proyectos[i]._id}')" data-toggle="modal" data-target="#crearNuevoArchivo" href="#">Archivo</a>
                        <a class="dropdown-item" onclick="buscarCarpeta('${response.proyectos[i]._id}')" data-toggle="modal" data-target="#crearNuevoProyecto" href="#">Proyecto</a>
                        <a class="dropdown-item" onclick="buscarCarpeta('${response.proyectos[i]._id}')" data-toggle="modal" data-target="#crearNuevaCarpeta" href="#">Carpeta</a>
                      </div>
                    </div>

                    <a onclick="buscarCarpeta('${response.proyectos[i]._id}')" data-toggle="modal" data-target="#crearNuevoProyecto" href="#" data-toggle="tooltip" title="Editar Carpeta"><span class="far fa-edit text-success"></span></a>
                    <a onclick="borrarProyecto('${response.proyectos[i]._id}')" href="#" data-toggle="tooltip" title="Borrar Carpeta"><span class="far fa-trash-alt text-danger"></span></a>
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

function actualizarCarpeta(){
  //console.log("Actualizar Proyecto: " + $('#carpeta-id').val());
  
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
      console.log(`Nombre Proyecto: ${response.carpeta.nombre}`);

      // Mensajes Validos
      $.alert({
        title: '',
        content: `Proyecto "${response.carpeta.nombre}", actualizado con exito`,
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

function borrarProyecto(id){
  console.log("Borrar Proyecto: " + $('#carpeta-id').val());
  
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
  //console.log("Editar Proyecto: " + $('#carpeta-id').val());
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
