var txtAreas = ["html", "css", "javascript"];
var modo = ["text/html", "css", "javascript"];
var editores = [];

for (var i = 0; i<txtAreas.length; i++){
  editores[i] = CodeMirror.fromTextArea(document.getElementById(txtAreas[i]), {
  mode: modo[i],
  lineNumbers: true,
  tabSize: 2,
  value: "CSS",
  cursorScrollMargin: 20,
  scrollbarStyle: "overlay"
  });
}

var input = document.getElementById("select");

function selectTheme() {
  var theme = input.options[input.selectedIndex].textContent;
  editores[0].setOption("theme", theme);
  editores[1].setOption("theme", theme);
  editores[2].setOption("theme", theme);
  location.hash = "#" + theme;
}

var choice = ( location.hash && location.hash.slice(1)) || (document.location.search && decodeURIComponent(document.location.search.slice(1)) );

if (choice) {
  input.value = choice;
  editores[0].setOption("theme", choice);
  editores[1].setOption("theme", choice);
  editores[2].setOption("theme", choice);
}

CodeMirror.on(window, "hashchange", function() {
  var theme = location.hash.slice(1);
  if (theme) { input.value = theme; selectTheme(); }
});

function loadfile(input, type) {
  var reader = new FileReader();

  reader.onload = function(e) {
      editores[type].setValue(e.target.result);
  }
  
  reader.readAsText(input.files[0]);
}

$(document).ready(function() {

  cargarProyecto();

});

function correrProyecto(){
  var html = editores[0].getValue();
  var css = editores[1].getValue();
  var javascript = editores[2].getValue();

  console.log(html);
  console.log(css);
  console.log(javascript);

  var estructura = `<!DOCTYPE html>
                    <html>
                    
                      <head>
                        <meta charset="utf-8">
                        <style>
                          ${css}  
                        </style>  
                      </head>

                      <body>
                        ${html} 
                        <script>
                          ${javascript}
                        </script>
                      </body>

                    </html>`;

  //var resultado = document.getElementById("resultado").contentWindow.document;
  //resultado.body.innerHTML = estructura;

  var frameResultado = document.getElementById("resultado");
  var resultado = frameResultado.contentDocument || frameResultado.contentWindow.document;
  
  resultado.open();
  resultado.write(estructura);
  resultado.close();
}

function cargarProyecto(){
  console.log("cargar un proyecto")

  //editores[0].setValue("hola");
  //editores[1].setValue("hola");
  //editores[2].setValue("hola");

  $.ajax({
    url: '/api/proyecto/cargarhtlm',
    method: "get",
    dataType: "json",
    success: function(response){
      console.log(response)
      console.log(response.archivo.contenido)
      
      editores[0].setValue(response.archivo.contenido);
    },
    error: function(err){
      console.error(err);
    }
  });

  $.ajax({
    url: '/api/proyecto/cargarcss',
    method: "get",
    dataType: "json",
    success: function(response){
      console.log(response)
      console.log(response.archivo.contenido)
      
      editores[1].setValue(response.archivo.contenido);
    },
    error: function(err){
      console.error(err);
    }
  });

  $.ajax({
    url: '/api/proyecto/cargarjs',
    method: "get",
    dataType: "json",
    success: function(response){
      console.log(response)
      console.log(response.archivo.contenido)
      
      editores[2].setValue(response.archivo.contenido);
    },
    error: function(err){
      console.error(err);
    }
  });
}

function guardarProyecto(){
  console.log("Guardar Proyecto")

  var html = editores[0].getValue();
  var css = editores[1].getValue();
  var javascript = editores[2].getValue();
  //console.log(html)
  //console.log(css)
  //console.log(javascript)

  $.ajax({
    url: '/api/proyecto/guardar',
    method: "PUT",
    dataType: "json",
    data: {
      "nombre": $('#carpeta-nombre').val(),
      "html": html,
      "css": css,
      "js": javascript
    },
    success: function(response){

    },
    error: function(err){
      console.error(err);
    }
  });

}
