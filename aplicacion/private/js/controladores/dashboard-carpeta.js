$( "#sidebar" ).load( "sidebar.html", function() {
  console.log( "Sidebar fue cargado con exito." );
});

$( "#nav-bar" ).load( "navbar-dashboard.html", function() {
  console.log( "Navbar fue cargado con exito." );
});

$(document).ready(function() {
  cargarDatos();
  //generarCarpetas();

  $(function () {
    $('[data-toggle="tooltip"]').tooltip({delay: { "show": 100, "hide": 100 }})
  });
  
});

function cargarDatos(){
  console.log("Cargar los Datos.")
   
  $.ajax({
    url: "/api/loged",
    method: "get",
    dataType: "json",
    success: function(response){
      console.log(`Tamaño: ${response.length}`);
      console.log(`Response: ${response}`);
      console.log(`Nombre: ${response[0].nombreUsuario}`);  
      console.log(`Correo: ${response[0].correo}`);
      
      if (response.length > 0){
        
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

  $.ajax({
		url: "/api/carpeta",
    method: "GET",
    dataType: "json",
    success: function(response){
      console.log(response);
      console.log(`carpetas: ${response.carpetas.length}`);

      document.getElementById('mostrar-carpetas').innerHTML = "";
  
      for(var i=0; i<response.carpetas.length; i++){
        document.getElementById('mostrar-carpetas').innerHTML +=
        `<div id="${[i+1]}" class="form-group card-padding col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <div class="text-center card">
            <div class="card-body">
              <div class="row margin">
                <div class="col-2 padding">
                </div>
                <div class="col-8 padding">
                  <h5 class="card-title">${response.carpetas[i].nombre}</h5>
                </div>

                <div class="col-2 padding">
                  <div class="float-right">
                    <a href="#" data-toggle="tooltip" title="Editar Carpeta"><span class="far fa-edit text-success"></span></a>
                    <a href="#" data-toggle="tooltip" title="Borrar Carpeta"><span class="far fa-trash-alt text-danger"></span></a>
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

$('#guard-empleado').click(function(){
  console.log($('#slc-tipo-trabajo').val());

  if($('#slc-tipo-trabajo').val() == "carpeta"){
    console.log("carpeta");

    $.ajax({
      url: "/api/",
      method: "POST",
      dataType: "json",
      success: function(response){
        console.log(`mensaje del servidor: ${response.length}`); 
      },
      error: function(err){
        console.error(err);
      }
    });

  } else if ($('#slc-tipo-trabajo').val() == "proyecto"){
    console.log("proyecto");
    $.ajax({
      url: "/api/",
      method: "POST",
      dataType: "json",
      success: function(response){
        console.log(`mensaje del servidor: ${response.length}`); 
      },
      error: function(err){
        console.error(err);
      }
    });

  } else if ($('#slc-tipo-trabajo').val() == "archivo"){
    console.log("archivo");
    $.ajax({
      url: "/api/",
      method: "POST",
      dataType: "json",
      success: function(response){
        console.log(`mensaje del servidor: ${response.length}`); 
      },
      error: function(err){
        console.error(err);
      }
    });

  }

});

$('#slc-tipo-trabajo').change(function(){
  
});

