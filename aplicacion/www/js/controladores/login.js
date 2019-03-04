var campos = [
  {campo:'correo', valido: false},
  {campo:'contrasena', valido: false}
];

function validarLogin(campo) {
  if($("#"+campo).val() == ""){
    //alert(campo+"invalido");
    $("#"+campo).removeClass("is-valid");
    $("#"+campo).addClass("is-invalid");
    $("#validar-"+campo).removeClass("valid-feedback");
    $("#validar-"+campo).addClass("invalid-feedback");
    $("#validar-"+campo).html("Campo Invalido");

    return false;
  } else {
    //alert(campo+"valido");
    $("#"+campo).removeClass("is-invalid");
    $("#"+campo).addClass("is-valid");
    $("#validar-"+campo).removeClass("invalid-feedback");
    $("#validar-"+campo).addClass("valid-feedback");
    $("#validar-"+campo).html("Campo Correcto");
    return true;
  }

}

$("#btn-login").click(function(){
  var loginValido = false;
  
  for (var i=0; i<campos.length; i++) {
    campos[i].valido = validarLogin(campos[i].campo);
  }

  for (var i=0; i<campos.length; i++){
    if (!campos[i].valido)
      return loginValido = false;
  }

  if (loginValido)
    window.location.href = "dash-carpeta.html";
});

// Variables a validar
// $("#contrasena").val()
// $("#correo").val()







