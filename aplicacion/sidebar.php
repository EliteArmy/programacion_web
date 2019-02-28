<!-- Importar el Sidebar -->
<nav id="sidebar" class="sidebar-wrapper">
  <div class="sidebar-content">
    <!-- sidebar-brand  -->
    <div class="sidebar-item sidebar-brand">
      <a href="#">Draco Code</a>
    </div>

    <!-- sidebar-header  -->
    <div class="sidebar-item sidebar-header d-flex flex-nowrap">
      <div class="user-pic">
        <img class="img-responsive img-rounded" src="img/user.jpg" alt="User picture">
      </div>
      <div class="user-info">
          <span class="user-name">Ariel
            <strong>Palma</strong>
          </span>
          <!--<span class="user-role">User</span>-->
          <span class="user-status">
            <i class="fas fa-circle"></i>
            <span>En linea</span>
          </span>
      </div>
    </div>

    <!-- sidebar-search  -->
    <div class="sidebar-item sidebar-search">
      <div>
        <div class="input-group">
          <input type="text" class="form-control search-menu" placeholder="Buscar...">
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- sidebar-menu  -->
    <div class=" sidebar-item sidebar-menu">
      <ul>
        <li class="header-menu">
          <span>General</span>
        </li>

        <li class="sidebar-dropdown">
          <a href="dash-carpeta.php">
            <i class="fas fa-folder"></i>
            <span class="menu-text">Carpetas</span>
            <span class="badge badge-pill badge-info">10</span>
          </a>
          <div class="sidebar-submenu">
            <ul>
              <li>
                <a href="#">Carpeta 1</a>
              </li>
              <li>
                <a href="#">Carpeta 2</a>
              </li>
              <li>
                <a href="#">Carpeta 3</a>
              </li>
              <li>
                <a href="#">Carpeta 4</a>
              </li>
            </ul>
          </div>
        </li>
        
        <li class="sidebar-dropdown">
          <a href="dash-proyecto.php">
            <i class="fas fa-file-code"></i>
            <span class="menu-text">Proyectos</span>
            <span class="badge badge-pill badge-info">20</span>
          </a>
          
          <div class="sidebar-submenu">
            <ul>
              <li>
                <a href="#">Proyecto 1</a>
              </li>
              <li>
                <a href="#">Proyecto 2</a>
              </li>
              <li>
                <a href="#">Proyecto 3</a>
              </li>
            </ul>
          </div>
        </li>

        <li class="sidebar-dropdown">
          <a href="dash-archivo.php">
            <i class="fas fa-file"></i>
            <span class="menu-text">Archivos</span>
            <span class="badge badge-pill badge-info">30</span>
          </a>
          
          <div class="sidebar-submenu">
            <ul>
              <li>
                <a href="#">Archivo 1</a>
              </li>
              <li>
                <a href="#">Archivo 2</a>
              </li>
              <li>
                <a href="#">Archivo 3</a>
              </li>
              <li>
                <a href="#">Archivo 4</a>
              </li>
            </ul>
          </div>
        </li>

        <li class="sidebar-dropdown">
          <a href="#">
            <i class="fas fa-shopping-cart"></i>
            <span class="menu-text">Planes</span>
            <span class="badge badge-pill badge-success">3</span>
          </a>
          <div class="sidebar-submenu">
            <ul>
              <li>
                <a href="#">Plan Pro<span class="badge badge-pill badge-success">Pro</span></a>
              </li>
              <li>
                <a href="#">Plan Básico<span class="badge badge-pill badge-warning">Básico</span></a>
              </li>
              <li>
                <a href="#">Plan Gratis<span class="badge badge-pill badge-warning">Gratis</span></a>
              </li>
            </ul>
          </div>
        </li>

        <li class="header-menu">
          <span>Extra</span>
        </li>

        <li>
          <a href="#">
            <i class="fas fa-book"></i>
            <span class="menu-text">Documentación</span>
            <span class="badge badge-pill badge-primary">Pronto</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i class="fas fa-archive"></i>
            <span class="menu-text">Ejemplos</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- sidebar-menu  -->
  </div>

  <!-- sidebar-footer  -->
  <div class="sidebar-footer">
    <div class="dropdown">
      <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-bell"></i>
        <span class="badge badge-pill badge-warning notification">3</span>
      </a>

      <div class="dropdown-menu notifications" aria-labelledby="dropdownMenuMessage">
        <div class="notifications-header">
          <i class="fas fa-bell"></i>
          Notifications
        </div>

        <div class="dropdown-divider"></div>

        <a class="dropdown-item" href="#">
          <div class="notification-content">
            <div class="icon">
              <i class="fas fa-check text-success border border-success"></i>
            </div>
            <div class="content">
              <div class="notification-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                elit. In totam explicabo</div>
              <div class="notification-time">
                6 minutes ago
              </div>
            </div>
          </div>
        </a>

        <a class="dropdown-item" href="#">
          <div class="notification-content">
            <div class="icon">
              <i class="fas fa-exclamation text-info border border-info"></i>
            </div>
            <div class="content">
              <div class="notification-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                elit. In totam explicabo</div>
              <div class="notification-time">
                Today
              </div>
            </div>
          </div>
        </a>

        <a class="dropdown-item" href="#">
          <div class="notification-content">
            <div class="icon">
              <i class="fas fa-exclamation-triangle text-warning border border-warning"></i>
            </div>
            <div class="content">
              <div class="notification-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. In totam explicabo</div>
              <div class="notification-time">
                  Yesterday
              </div>
            </div>
          </div>
        </a>

        <div class="dropdown-divider"></div>
        <a class="dropdown-item text-center" href="#">View all notifications</a>
      </div>
    </div>

    <div class="dropdown">
      <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-envelope"></i>
        <span class="badge badge-pill badge-success notification">7</span>
      </a>

        <div class="dropdown-menu messages" aria-labelledby="dropdownMenuMessage">
          <div class="messages-header">
            <i class="fas fa-envelope"></i>
            Messages
          </div>

          <div class="dropdown-divider"></div>

          <a class="dropdown-item" href="#">
            <div class="message-content">
              <div class="pic">
                <img src="img/user.jpg" alt="">
              </div>
              <div class="content">
                <div class="message-title">
                  <strong> Jhon doe</strong>
                </div>
                <div class="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. In totam explicabo
                </div>
              </div>
            </div>
          </a>

          <a class="dropdown-item" href="#">
            <div class="message-content">
              <div class="pic">
                <img src="img/user.jpg" alt="">
              </div>

              <div class="content">
                  <div class="message-title">
                    <strong> Jhon doe</strong>
                  </div>
                  <div class="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. In totam explicabo
                  </div>
                </div>
              </div>
          </a>

          <a class="dropdown-item" href="#">
            <div class="message-content">
              <div class="pic">
                <img src="img/user.jpg" alt="">
              </div>

              <div class="content">
                <div class="message-title">
                  <strong> Jhon doe</strong>
                </div>
                <div class="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. In totam explicabo
                </div>
              </div>
            </div>
          </a>

          <div class="dropdown-divider"></div>

          <a class="dropdown-item text-center" href="#">View all messages</a>
        </div>
    </div>

    <div class="dropdown">
      <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-cog"></i>
        <span class="badge-sonar"></span>
      </a>
      
      <div class="dropdown-menu" aria-labelledby="dropdownMenuMessage">
        <a class="dropdown-item" href="#">My profile</a>
        <a class="dropdown-item" href="#">Setting</a>
      </div>
    </div>

    <div class="cerrar">
      <a href="login.php">
        <i class="fas fa-power-off"></i>
      </a>
    </div>

    <div class="pinned-footer">
      <a href="#">
        <i class="fas fa-ellipsis-h"></i>
      </a>
    </div>
  </div>
</nav>