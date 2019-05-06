# Draco Code
Draco Code es un pequeño proyecto de clase para la Creación y Edición de códigos

El metodo de instalación es:
1. Instalar Nodejs: https://nodejs.org/en/download/
2. Abrir una consola en la carpeta Raiz del proyecto y correr el comando: nodemon index.js para levantar el servidor.
3. Una vez se levante el servidor, la aplicacion se va a conectar a una base en https://www.mlab.com para su funcionamiento.
4. Acceder desde el navegador a la ruta: http://localhost:3000/

Demo del proyecto en Heroku:
https://draco-code.herokuapp.com/login.html

Funcionalidades:
Usuario:
  • Creación de nuevos Usuarios por medio de registro
  • Mostrar nombre del usuario en el navbar luego del Login
  • Mostrar información del usuario en el perfil luego del Login
  • Actualizar información de Usuarios en su perfil

Autenticación:
  • Login (Creación de sesión)
  • Logout (Remover la sesión)
  • Redireccionar al dashboard en caso de estar autenticado y buscar una página que no existe 
  • Redireccionar al login en caso de no estar autenticado y buscar una página que no existe

Carpetas:
  • Leer Carpetas y mostrarlas
  • Creación de Carpetas
  • Creación de Carpetas dentro de carpetas
  • Actualizar información de Carpetas
    -> Nombre
    -> Descripción
    -> Imagen (Simulado)
  • Borrar Carpetas
  
Proyectos
  • Leer Proyectos y mostrarlos
  • Creación de Proyectos
  • Editar el contenido de los proyectos a través del editor
  • Actualizar información del proyecto
    -> Nombre
    -> Descripción
    -> Imagen (Simulado)

Archivos:
  • Leer Archivos y mostrarlos
  • Creación de Archivos
  • Editar Archivos
  • Borrar Archivos
  • Actualizar información del proyecto
    -> Nombre
    -> Descripción
    -> Imagen (Simulado)

Editor:
  • Cambiar los temas en el editor (Syntax highlighting)
  • Mostrar el resultado de la combinacion de HTML, CSS y JS dentro de la página
  • Descargar los archivos desde el editor
  • Subir archivos al editor
  • Cargar proyectos (archivos html, css y js) en el editor desde la base
  • Guardar cambios de proyectos (archivos html, css y js) en la base desde el editor

Misceláneo:
  • Navegación entre las páginas del sitio
  • Responsive
  • Pagina de Logout con redirección al login en 5s.
