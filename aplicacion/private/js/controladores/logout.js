$(document).ready(function() {

  salir();
  
});

function salir (){
  $.ajax({
    url: "/api/logout",
    method: "GET",
    dataType: "json",
    success: function(response){
      if (response.estatus == 1) {
        console.log(response.mensaje)
        pageRedirect();       
      }
    },
    error: function(error){
      console.error(error);
    }
  });
}

function pageRedirect(){
  var delay = 2000; // tiempo en millisegundos
 
  // Display message
  //document.getElementById("message").innerHTML = "Please wait, you are redirecting to the new page.";
  
  setTimeout(function(){
   window.location = "login.html";
  }, delay);
  
 }

$("#btn-logout").click(function(){
  
  console.log('Salir del Sitio')
  
  $.ajax({
    url:"/api/logout",
    method: "GET",
    dataType: "json",
    success: function(response){

    },
    error: function(error){
      console.error(error);
    }
  });

});
