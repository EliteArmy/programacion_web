var campos = [
  {campo:'correo', expresion: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 
  formato: 'Ingrese un correo o contraseña válida.', valido: false},
  {campo:'contrasena', expresion: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,100})$/, 
  formato: 'Ingrese un correo o contraseña válida',  valido: false}
];

/* 
/^( (?=\S*?[A-Z]) (?=\S*?[a-z]) (?=\S*?[0-9]).{6,100} )$
Revisa que la contraseña tenga un minimo de 6 caracteres, 
por lo menos 1 letra mayuscula, 1 letra minuscula, 1 numero, y sin espacios.
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
  var loginValido = false; // Inicialmente es falso\
  
  // Manda  a llamar la función de validar por cada campo
  for (var i=0; i<campos.length; i++) {
    campos[i].valido = validarLogin(campos[i].campo, campos[i].expresion, campos[i].formato);
  }

  for (var i=0; i<campos.length; i++){
    if (!campos[i].valido){
      return loginValido = false;
    } else {
      loginValido = true;
    }
  }

  //console.log(`Validación: ${loginValido}`);
  //console.log("correo: "+ $('#correo').val())
  //console.log("contrasena: "+ $('#contrasena').val())

  if (loginValido){
    //console.log('Ingresar al Login')
    $.ajax({
      url:`/api/login`,
      method: "POST",
      dataType: "json",
      data: {
        "correo": $('#correo').val(),
        "contrasena": $('#contrasena').val(),
      },
      success: function(response){
        //console.log(`mensaje del servidor: ${response}`); 
        //console.log(`mensaje del servidor1: ${response.estatus}`);
        //console.log(`mensaje del servidor2: ${response.mensaje}`);   
        if (response.estatus == 1)
          window.location.href = "/dash-carpeta.html";
        else
          console.log("No direccion: "+response.mensaje);
      },
      error: function(error){
        console.error(error);
      }
    });
  }

});

