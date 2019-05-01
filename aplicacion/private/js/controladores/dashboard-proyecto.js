$(document).ready(function() {
  generarProyectos();

  $(function () {
    $('[data-toggle="tooltip"]').tooltip({delay: { "show": 100, "hide": 100 }})
  });
  
});

$("#sidebar").load('sidebar.html');
$("#nav-bar").load('navbar-dashboard.html');

var informacionProyectos = [
  {nombre:'Proyecto 01', descripcion:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, incidunt..'},
  {nombre:'Proyecto 02', descripcion:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, incidunt..'},
  {nombre:'Proyecto 03', descripcion:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, incidunt..'},
  {nombre:'Proyecto 04', descripcion:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, incidunt..'},
  {nombre:'Proyecto 05', descripcion:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, incidunt..'},
  {nombre:'Proyecto 06', descripcion:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, incidunt..'}
];

console.log(informacionProyectos.length);

function generarProyectos(){
  
  document.getElementById('mostrar-proyectos').innerHTML = "";
  
  for(var i=0; i<informacionProyectos.length; i++){
    document.getElementById('mostrar-proyectos').innerHTML +=
    `<div id="${[i+1]}" class="form-group card-padding col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
      <div class="text-center card">
        <div class="card-body">
          <div class="row margin">
            <div class="col-2 padding">
            </div>
            <div class="col-8 padding">
              <h5 class="card-title">${informacionProyectos[i].nombre}</h5>
            </div>
            <div class="col-2 padding">
              <div class="float-right">
                <a href="#" data-toggle="tooltip" title="Editar Carpeta"><span class="far fa-edit text-success"></span></a>
                <a href="#" data-toggle="tooltip" title="Borrar Carpeta"><span class="far fa-trash-alt text-danger"></span></a>
              </div>
            </div>
          </div>
          <div">
            <a class="" href="editor.html"><span class="fas fa-file-code folder"></span></a>
          </div>
          <p class="card-text">${informacionProyectos[i].descripcion}</p>
        </div>
      </div>
    </div>`;
  }
}

