$("#btn-logout").click(function(){
  console.log('Salir del Sitio')
  $.ajax({
    url:`/api/logout`,
    method: "GET",
    dataType: "json",
    success: function(response){
      console.log("mensaje del servidor:" + response.mensaje);
      window.location.href = "/login.html";  
    },
    error: function(error){
      console.error(error);
    }
  });

});

