<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Code html css javascript">
  
  <title>Draco Code</title>

  <link rel="stylesheet" type="text/css" href="./css/bootstrap.css">
  <link rel="stylesheet" type="text/css" href="./css/jquery.mCustomScrollbar.min.css">
  <link rel="stylesheet" type="text/css" href="./plugin/font-awesome/css/all.css">

  <link rel="stylesheet" type="text/css" href="./css/sidebar-main.css">
  <link rel="stylesheet" type="text/css" href="./css/sidebar-themes.css">
  <link rel="shortcut icon" type="image/png" href="img/favicon.png">
</head>

<body>
  <!-- envoltura pagina -->
  <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
    
    <!-- Importar el Sidebard -->
    <?php include("./sidebar.php"); ?>
      
    <!-- contenido pagina  -->
    <main class="page-content pt-2">
        <div id="overlay" class="overlay">
        </div>
        
        <div class="container-fluid p-5">
          <div class="row">
            <div class="form-group col-md-12">
              <h2>Sidebar template</h2>
              <p>This is a responsive sidebar template with dropdown menu based on bootstrap 4 framework.</p>
            </div>

            <div class="form-group col-md-12">
              <a id="toggle-sidebar" class="btn btn-dark" href="#">
                <span>Toggle Sidebar</span>
              </a>
              <a id="pin-sidebar" class="btn btn-dark" href="#">
                <span>Pin Sidebar</span>
              </a>
            </div>
          </div>
            
          <hr>
            
          <div class="row">
            <div class="form-group col-md-12">
              <h3>Themes</h3>
              <p>Here are more themes that you can use</p>
            </div>
          </div>

          <div class="row">
            <div class="form-group col-md-12">
              <a href="#" data-theme="default-theme" class="theme default-theme selected"></a>
              <a href="#" data-theme="chiller-theme" class="theme chiller-theme"></a>
              <a href="#" data-theme="legacy-theme" class="theme legacy-theme"></a>
              <a href="#" data-theme="ice-theme" class="theme ice-theme"></a>
              <a href="#" data-theme="cool-theme" class="theme cool-theme"></a>
              <a href="#" data-theme="light-theme" class="theme light-theme"></a>
            </div>
            
            <div class="form-group col-md-12">
              <p>You can also use background image </p>
            </div>
            
            <div class="form-group col-md-12">
              <a href="#" data-bg="bg1" class="theme theme-bg selected"></a>
              <a href="#" data-bg="bg2" class="theme theme-bg"></a>
              <a href="#" data-bg="bg3" class="theme theme-bg"></a>
              <a href="#" data-bg="bg4" class="theme theme-bg"></a>
            </div>
            
            <div class="form-group col-md-12">
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="toggle-bg" checked>
                <label class="custom-control-label" for="toggle-bg">Background image</label>
              </div>
            </div>
            
            <div class="form-group col-md-12">
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="toggle-border-radius">
                <label class="custom-control-label" for="toggle-border-radius">Border radius</label>
              </div>
            </div>
          </div>

        </div>
    </main>
    <!-- contenido pagina -->
  </div>
  <!-- envoltura pagina -->

  <script type="text/javascript" src="./js/jquery-3.3.1.js"></script>
  <script type="text/javascript" src="./js/bootstrap.bundle.js"></script>
  <script type="text/javascript" src="./js/jquery.mCustomScrollbar.concat.min.js"></script>
  <script type="text/javascript" src="./plugin/font-awesome/js/all.js" data-auto-replace-svg="nest"></script>
  <script type="text/javascript" src="./js/sidebar-main.js"></script>
  
</body>

</html>