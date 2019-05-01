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

