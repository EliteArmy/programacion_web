<!DOCTYPE html>
<html>

  <head>
    <meta charset="utf-8">
    <meta name="author" content="Julio Ariel G. P.">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>Login</title>    
    
    <link rel="stylesheet" type="text/css" media="screen" href="./css/bootstrap.css">
    <link rel="stylesheet" type="text/css" media="screen" href="./css/estilos.css">

  </head>

  <body class="">
    <!-- Contenido -->
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12">

          <form class="form-signin well card">
            <div class="heading-image text-white text-center">
              <span class="" aria-hidden="true" href="">
              <img src="img/dargon2.png" alt="dragon" width="75" height="75"></span>
            </div>
            
            <div class="text-center mt-4">
              <h1 class="h3 mb-3 font-weight-normal">Inicio de Sesión</h1>
            </div>

            <label for="correo">Correo Electrónico</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text fas fa-user bg-white border-right-0"></span>
              </div>
              <input type="text" id="correo" class="form-control border-left-0" placeholder="Correo Electrónico" autofocus>
            </div>

            
            <label for="contrasena">Contraseña</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text fas fa-lock bg-white border-right-0"></span>
              </div>
              <input type="password" id="contrasena" class="form-control border-left-0" placeholder="Contraseña">
            </div>

            <div class="checkbox mb-3">
              <label>
                <input type="checkbox" onchange="document.getElementById('contrasena').type = this.checked ? 'text' : 'password'"> Mostrar Contraseña
              </label>
            </div>
            
            <div>
              <a href="dash-carpeta.php">
                <button id="btn-login" class="btn btn-primary btn-block" type="button">Ingresar</button>
              </a>
            </div>

            <div>
              <div class="mt-3">
                <a href="#" class="float-left"><i>Registrarse</i></a>
              </div>
  
              <div class="mt-3">
                  <a href="#" class="float-right"><i>Olvido su contraseña?</i></a>
              </div>
            </div>

            <!--<button class="mt-3 btn btn-lg btn-primary btn-block" type="button"> <span class="fab fa-facebook"></span>Conectarse con facebook</button>
            -->
          </form>

          <footer>
            <p class="mt-3 mb-3 text-center text-white">
              Copyright © 2019 Julio Ariel
            </p>
          </footer>
        </div>
      </div>
    </div>
    <!-- Fin Contenido -->

    <script type="text/javascript" src="./js/jquery-3.3.1.js"></script>
    <script type="text/javascript" src="./js/bootstrap.bundle.js"></script>
    <script type="text/javascript" src="./plugin/font-awesome/js/all.js" data-auto-replace-svg="nest"></script>
    <script type="text/javascript" src="./js/controladores/login.js"></script>

  </body>

</html>

