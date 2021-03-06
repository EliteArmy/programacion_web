var campos = [
  {campo:'correo', expresion: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 
  formato: 'Ingrese un correo válido.', valido: false},
  {campo:'contrasena', expresion: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,100})$/, 
  formato: 'La contraseña debe tener por lo menos de 6 caracteres, 1 letra mayúscula, 1 letra minúscula, y 1 numero.', valido: false},
  {campo:'usuario', expresion: /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,20}[a-zA-Z0-9]$/, 
  formato: 'El usuario debe tener entre 6 a 20 caracteres, sin espacios, y puede llevar (_) ó (.) en medio.', valido: false}
];

/*
^( (?=\S*?[A-Z]) (?=\S*?[a-z]) (?=\S*?[0-9]).{6,100} )$
Revisa que la contraseña tenga un minimo de 6 caracteres, 
por lo menos 1 letra mayuscula, 1 letra minuscula, 1 numero, y sin espacios.

^[a-zA-Z0-9] ([._](?![._]) | [a-zA-Z0-9]) {4,20}[a-zA-Z0-9]$
revisa que el usuario sea de 6-20 caracteres de largo, 
pueda llevar o no . y _
y debe terminar e iniciar en una letra o  un numero.
*/

function validarLogin(campo, expresion, formato) {
  var re = expresion;
  var valor = $("#"+campo).val();
  
  if($("#"+campo).val() == ""){
    $("#"+campo).removeClass("is-valid");
    $("#"+campo).addClass("is-invalid");
    $("#validar-"+campo).removeClass("valid-feedback");
    $("#validar-"+campo).addClass("invalid-feedback");
    $("#validar-"+campo).html("Ingrese el dato");
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

$("#btn-login").click(function(){
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
    window.location.href = "dash-carpeta.html";
});


