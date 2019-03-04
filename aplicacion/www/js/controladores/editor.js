var txtAreas = ["html", "css", "javascript", "html-resultado"];
var modo = ["text/html", "css", "javascript", "text/html"];
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
  editores[3].setOption("theme", theme);
  location.hash = "#" + theme;
}

var choice = ( location.hash && location.hash.slice(1)) || (document.location.search && decodeURIComponent(document.location.search.slice(1)) );

if (choice) {
  input.value = choice;
  editores[0].setOption("theme", choice);
  editores[1].setOption("theme", choice);
  editores[2].setOption("theme", choice);
  editores[3].setOption("theme", choice);
}

CodeMirror.on(window, "hashchange", function() {
  var theme = location.hash.slice(1);
  if (theme) { input.value = theme; selectTheme(); }
});


/* Test */
/*$("#generar").click(function(){
  alert("Generando Html");
  
  editores[0].setValue(`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Page Title</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      <p>Hola Mundo!</p>
    </body>
  </html>`);

  alert(editores[0].getValue())

});*/

function loadfile(input) {
  var reader = new FileReader();
  reader.onload = function(e) {
      editores[0].setValue(e.target.result);
  }
  reader.readAsText(input.files[0]);
}






