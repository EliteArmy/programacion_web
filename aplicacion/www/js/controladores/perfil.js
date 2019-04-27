$(document).ready(function() {

  $(function () {
    $('[data-toggle="tooltip"]').tooltip({delay: { "show": 100, "hide": 100 }})
  });
/*
  url:`/usuarios/${$("#slc-usuario").val()}/contactos`,
  
  $.ajax({
		url:`/usuarios/${$("#slc-usuario").val()}/contactos`,
    method: "POST",
    dataType:"json",
		success: function(response){
			console.log(response);

		},
		error: function(error){
      console.error(error);
      
		}
	});
*/

});

$("#sidebar").load('sidebar.html');
$("#nav-bar").load('navbar-dashboard.html');

var campos = [
  {campo:'nombre', expresion: /^([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/i, 
  formato: 'Ingrese un nombre valido', valido: false},
  
  {campo:'apellido', expresion: /^([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/i, 
  formato: 'Ingrese un apellido valido',  valido: false},
  
  {campo:'usuario', expresion: /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,20}[a-zA-Z0-9]$/, 
  formato: 'El usuario debe tener entre 6 a 20 caracteres, sin espacios, y puede llevar (_) ó (.) en medio.',  valido: false},
  
  {campo:'correo', expresion: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 
  formato: 'Ingrese un correo valido',  valido: false},
  
  {campo:'contrasena', expresion: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,100})$/, 
  formato: 'La contraseña nueva debe tener por lo menos de 6 caracteres, 1 letra mayúscula, 1 letra minúscula, y 1 numero.',  valido: false}
];

function validarLogin(campo, expresion, formato) {
  var re = expresion;
  var valor = $("#"+campo).val();
  
  if($("#"+campo).val() == ""){
    $("#"+campo).removeClass("is-valid");
    $("#"+campo).addClass("is-invalid");
    $("#validar-"+campo).removeClass("valid-feedback");
    $("#validar-"+campo).addClass("invalid-feedback");
    $("#validar-"+campo).html("Ingrese es dato");
    return false;

  } else if (!re.test(valor)) {
    $("#"+campo).removeClass("is-valid");
    $("#"+campo).addClass("is-invalid");
    $("#validar-"+campo).removeClass("valid-feedback");
    $("#validar-"+campo).addClass("invalid-feedback");
    $("#validar-"+campo).html(formato);
    return false;

  }
  else {
    $("#"+campo).removeClass("is-invalid");
    $("#"+campo).addClass("is-valid");
    $("#validar-"+campo).removeClass("invalid-feedback");
    $("#validar-"+campo).addClass("valid-feedback");
    $("#validar-"+campo).html("Campo Correcto");
    return true;
    
  }
}

$("#btn-guardar").click(function(){
  var loginValido = false; // Inicialmente es falso
  
  // Manda  a llamar la función de validar por cada campo
  for (var i=0; i<campos.length; i++) {
    campos[i].valido = validarLogin(campos[i].campo, campos[i].expresion, campos[i].formato);
  }

  for (var i=0; i<campos.length; i++){
    if (!campos[i].valido)
      return loginValido = false;
  }

  if (loginValido)
    console.log("Datos Guardados con Exito");
    //window.location.href = "dash-carpeta.html";
});

