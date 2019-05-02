$( "#sidebar" ).load( "sidebar.html", function() {
  console.log( "Load was performed." );
});

$( "#nav-bar" ).load( "navbar-dashboard.html", function() {
  console.log( "Load was performed." );
});

$(document).ready(function() {
  /*
  $.ajax({
    url: "navbar-dashboard.html", 
    dataType: "text",
    //context: document.body,
    success: function(response) {
      $("#nav-bar").html(response);
    }
  });

  $.ajax({
    url: "sidebar.html", 
    dataType: "text",
    //context: document.body,
    success: function(response) {
      $("#sidebar").html(response);
    }
  });
*/
  $.ajax({
    url: "/api/loged",
    method: "GET",
    dataType: "json",
    success: function(response){
      console.log(`mensaje del servidor: ${response.length}`); 
      
      //console.log(`mensaje del servidor3: ${response[0].nombre}`);  
      if (response.length > 0){
        console.log(`mensaje del servidor3: ${response[0].nombre}`);  
        $('#nombre-usuario').html(response[0].nombre)
        $('#nombre-usuario2').html(response[0].nombre)
      } else {
        //window.location.href = "/login.html";
        console.log(`mensaje del servidor2: ${response[0].correo}`);
      }
    },
    error: function(error){
      console.error(error);
    }
  });
  
  generarCarpetas();

  $(function () {
    $('[data-toggle="tooltip"]').tooltip({delay: { "show": 100, "hide": 100 }})
  });
  
});

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
		error: function(error){
      console.error(error);
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
      error: function(error){
        console.error(error);
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
      error: function(error){
        console.error(error);
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
      error: function(error){
        console.error(error);
      }
    });

  }

});

$('#slc-tipo-trabajo').onchange(function(){
  

});

