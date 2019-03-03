var txtAreas = ["html", "css", "javascript", "html-resultado"]
var modo = ["text/html", "css", "javascript", "text/html"]
var editores = [];

for (var i = 0; i<txtAreas.length; i++){
    editores[i] = CodeMirror.fromTextArea(document.getElementById(txtAreas[i]), {
    mode: modo[i],
    lineNumbers: true,
    tabSize: 2,
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



