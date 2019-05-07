$("#sidebar").load("sidebar.html", function() {
  //console.log("Sidebar fue cargado con exito.");
});

$("#nav-bar").load("navbar-dashboard.html", function() {
  //console.log("Navbar fue cargado con exito.");
});

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

function validarDatos(campo, expresion, formato) {
  var re = expresion;
  var valor = $("#"+campo).val();
  
  if($("#"+campo).val() == ""){
    $("#"+campo).removeClass("is-valid");
    $("#"+campo).addClass("is-invalid");
    $("#validar-"+campo).removeClass("valid-feedback");
    $("#validar-"+campo).addClass("invalid-feedback");
    $("#validar-"+campo).html("Ingrese el dato solicitado");
    return false;

  } else if (!re.test(valor)) {
    $("#"+campo).removeClass("is-valid");
    $("#"+campo).addClass("is-invalid");
    $("#validar-"+campo).removeClass("valid-feedback");
    $("#validar-"+campo).addClass("invalid-feedback");
    $("#validar-"+campo).html(formato);
    return false;

  } else {
    $("#"+campo).removeClass("is-invalid");
    $("#"+campo).addClass("is-valid");
    $("#validar-"+campo).removeClass("invalid-feedback");
    $("#validar-"+campo).addClass("valid-feedback");
    $("#validar-"+campo).html("Campo Correcto");
    return true;
  }
}

$(document).ready(function() {

  $(function () {
    $('[data-toggle="tooltip"]').tooltip({delay: { "show": 100, "hide": 100 }})
  });

  cargarDatos();

});

function cargarDatos(){
  //console.log("Cargar los Datos del Usuario.")
   
  $.ajax({
    url: "/api/usuario/id",
    method: "GET",
    dataType: "json",
    success: function(response){
      //console.log(`Se cargaron los datos de: ${response.usuario.nombreUsuario} con exito.`);
      
      $('#nombre-usuario').html(response.usuario.nombreUsuario);
      $('#nombre-usuario2').html(response.usuario.nombreUsuario);
      $('#nombre-usuario3').html(response.usuario.nombreUsuario);
      $('#nombre-cuenta').html(response.usuario.nombre);
      $('#descripcion-cuenta').html(response.usuario.descripcion);
      
      $('#nombre').val(response.usuario.nombre);
      $('#apellido').val(response.usuario.apellido);
      $('#usuario').val(response.usuario.nombreUsuario);
      $('#correo').val(response.usuario.correo);
      $('#contrasena').val(response.usuario.contrasena);
      $('#descripcion').val(response.usuario.descripcion);
      $('#slc-tipo-plan').selectpicker('val',response.usuario.plan);
      //$('#').val(response.usuario.);
    },
    error: function(err){
      console.log(err);
    }
  });

}

function actualizarUsuario(){

  $.ajax({
    url: '/api/usuario/id',
    method: "PUT",
    dataType: "json",
    data: {
      "nombre": $('#nombre').val(),
      "apellido": $('#apellido').val(),
      "nombreUsuario": $('#usuario').val(),
      "correo": $('#correo').val(),
      "contrasena": $('#contrasena').val(),
      "descripcion": $('#descripcion').val(),
      "plan": $('#slc-tipo-plan').val()
    },
    success: function(response){
      //console.log(`Nombre usuario: ${response.usuario.nombre}`);

      // Mensajes Validos
      $.alert({
        title: '',
        content: `Usuario "${response.usuario.nombreUsuario}", actualizado con exito`,
        type: 'green',
        typeAnimated: true,
        icon: 'fas fa-check',
        closeIcon: true,
        closeIconClass: 'fas fa-times',
        autoClose: 'cerrar|5000', // Tiempo para cerrar el mensaje
        theme: 'modern', // Acepta propiedades CSS
        buttons: {
          cerrar: {
            text: 'Cerrar',
            btnClass: 'btn-success',
            keys: ['enter', 'shift']
          }
        }
      });

      cargarDatos();
    },
    error: function(err){
      console.error(err);
    }
  });
}

$("#btn-guardar").click(function(){
  var datosValidos = false; // Inicialmente es falso
  
  // Manda  a llamar la función de validar por cada campo
  for (var i=0; i<campos.length; i++) {
    campos[i].valido = validarDatos(campos[i].campo, campos[i].expresion, campos[i].formato);
  }

  for (var i=0; i<campos.length; i++){
    if (!campos[i].valido){
      return datosValidos = false;
    } else {
      datosValidos = true;
    }
  }

  if (datosValidos) {
    actualizarUsuario();
  }


});

