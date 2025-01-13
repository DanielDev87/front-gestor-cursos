# React + Vite

El Proyecto se conecta al API desarrollada con con SpringBoot, este lo desarrolé con REACT VITE utilizando Boostrap

# Proyecto Front-End - Plataforma de Cursos

Este es el front-end de una plataforma de gestión de cursos. La aplicación permite a los usuarios navegar entre distintas páginas como la de docentes, cursos, y registro de nuevos cursos. Está desarrollada con **React** y utiliza **React Router** para la navegación.

## Requisitos

Antes de ejecutar este proyecto, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [npm](https://www.npmjs.com/) (v8 o superior)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/plataforma-cursos.git

avega al directorio del proyecto:

cd plataforma-cursos

Instala las dependencias necesarias:

    npm install

Ejecución

Una vez que las dependencias estén instaladas, puedes iniciar el servidor de desarrollo con el siguiente comando:

npm run dev

Esto lanzará la aplicación en el siguiente enlace: http://localhost:5173
Estructura del Proyecto

La estructura del proyecto es la siguiente:

plataforma-cursos/
├── public/                    # Archivos públicos como el HTML principal y el favicon
│   └── index.html
├── src/                       # Código fuente de la aplicación
│   ├── components/            # Componentes reutilizables (por ejemplo, botones, formularios)
│   ├── pages/                 # Páginas principales de la app (por ejemplo, CursosPage, DocentesPage)
│   ├── App.jsx                # Componente principal
│   └── main.jsx               # Punto de entrada de la aplicación
├── .gitignore                 # Archivos que se deben ignorar por Git
├── package.json               # Información del proyecto y dependencias
└── README.md                  # Este archivo

Rutas Principales

    /cursos - Página que lista todos los cursos disponibles en la plataforma.
    /docentes - Página donde se muestran los docentes disponibles.

Características

    React Router: Se utiliza para la navegación entre las distintas vistas.
    Axios: Para las solicitudes HTTP al back-end (API de cursos y docentes).
    Hooks de React: Se emplean para manejar el estado y efectos dentro de los componentes.


Desarrollado por Daniel Agudelo