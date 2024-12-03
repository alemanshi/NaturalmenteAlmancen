# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Naturalmente - Tienda en línea

Este es un proyecto de una tienda en línea llamada **Naturalmente**, que ofrece productos relacionados con miel, jalea real y propóleo. El sitio está construido con **React** y utiliza **Firebase** para la gestión de productos y almacenamiento de datos. A continuación, los detalles.

## Requisitos previos

Antes de comenzar, tener instalados los siguientes programas:

- **Node.js**: La versión recomendada de Node.js es la versión `16.x` o superior. Puedes descargarlo desde [aquí](https://nodejs.org/).
- **npm**: El gestor de paquetes de Node.js (generalmente se instala junto con Node.js).
- **Firebase**


## Tecnologías utilizadas

- **React**: Librería de JavaScript para la creación de interfaces de usuario interactivas.
- **React Router DOM**: Para la gestión de rutas y navegación.
- **Firebase**: Para el almacenamiento de productos y la creación de órdenes de compra.
- **Context API**: Para la gestión del estado global del carrito de compras.
- **FontAwesome**: Para los íconos del carrito de compras.
- **CSS**: Para los estilos de la aplicación.
- **Vite**: Para la configuración de la aplicación, incluyendo la compilación y el empaquetado.

## Sitio

https://almacennaturalmente.netlify.app/


## Estructura del proyecto
/src
/public            # Imagenes de productos
  /assets          # Logo & foto de la marca
  /components      # Componentes reutilizables como el Navbar, CartWidget, Item, etc.
  /firebaseConfig  # Configuración de Firebase
  *.css            # Archivos CSS para los estilos
  App.jsx          # Componente principal
  main.jsx         # Punto de entrada de la aplicación

## Características
- Tienda en línea: Los usuarios pueden ver los productos por categoría y detalle.
- Carrito de compras: Los usuarios pueden agregar productos al carrito, ver el resumen y finalizar la compra.
- Actualización de stock: Después de realizar una compra, el stock de los productos se actualiza automáticamente en Firebase.
- Navegación fácil: La navegación es posible gracias a React Router, que permite moverse entre las categorías, detalles de los productos y la página de checkout.
- Gestión de cantidad: Los usuarios pueden seleccionar la cantidad de productos a agregar al carrito mediante el componente QuantitySelector.

## Roadmap

Algunas características que planeo agregar en el futuro:

- [ ] Implementar una página de "Contacto" para los usuarios.
- [ ] Añadir autenticación de usuarios (registro y login).
- [ ] Crear una página de administración para agregar y editar productos fácilmente.


## Autores

- **Alejandro Mansilla** - Desarrollador principal


