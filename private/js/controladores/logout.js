$(document).ready(function() {
  salir();
});

function salir (){
  $.ajax({
    url: "/api/logout",
    method: "POST",
    dataType: "json",
    success: function(response){
      if (response.estatus == 1) {
        console.log(response.mensaje)
        pageRedirect();       
      }
    },
    error: function(error){
      console.log(error);
    }
  });
}

function pageRedirect(){
  var delay = 5000; // tiempo en millisegundos
 
  setTimeout(function(){
    window.location = "login.html";}, delay);
  
 }

$("#btn-logout").click(function(){
  
  //console.log('Salir del Sitio')
  
  $.ajax({
    url: "/api/logout",
    method: "GET",
    dataType: "json",
    success: function(response){

    },
    error: function(error){
      console.error(error);
    }
  });

});

$("#btn-login").click(function(){
  window.location = "login.html"
});

