# Consigna del Proyecto Final

## Objetivo

Desarrollar una API REST para que la tienda oficial del cliente pueda administrar su catálogo de productos mediante operaciones de lectura, creación, actualización y eliminación.

La API debe proteger el acceso con autenticación, almacenar los datos en Firestore de Firebase y organizar el código en capas para facilitar su mantenimiento y crecimiento. Este documento describe el **objetivo final del proyecto** y sirve como referencia para mantener el alcance y la estrategia.

## Requerimientos

### 1. Configuración inicial

- Crear un directorio para el proyecto e incluir `index.js` como punto de entrada.
- Inicializar Node.js y npm con `npm init -y`.
- Agregar la propiedad `"type": "module"` a `package.json` para habilitar ESModules.
- Configurar un script `start` que permita ejecutar la aplicación con `npm run start`.

### 2. Dependencias

Instalar como dependencias del proyecto:

- `express`
- `cors`
- `body-parser`
- `dotenv`
- `firebase`
- `jsonwebtoken`

### 3. Configuración del servidor

- Crear y configurar el servidor web con Express en `index.js`.
- Configurar CORS para permitir solicitudes desde las aplicaciones frontend.
- Configurar middleware global para interpretar los cuerpos de las solicitudes en formato JSON.
- Agregar un middleware para rutas desconocidas que responda con estado `404` y un mensaje.
- Crear un archivo `.env` para almacenar las variables de entorno del proyecto.

### 4. Rutas

Crear la capa de rutas para productos y autenticación.

#### Productos (`products.routes.js`)

| Método | Ruta | Función |
| --- | --- | --- |
| GET | `/api/products` | Devuelve todos los productos. |
| GET | `/api/products/:id` | Devuelve el producto con el ID indicado. |
| POST | `/api/products/create` | Recibe los datos de un producto en el cuerpo de la solicitud y lo guarda en el servicio de datos en la nube. |
| DELETE | `/api/products/:id` | Elimina el producto con el ID indicado. |

#### Autenticación (`auth.routes.js`)

| Método | Ruta | Función |
| --- | --- | --- |
| POST | `/auth/login` | Recibe credenciales y devuelve un Bearer token si son válidas; de lo contrario, responde con un error de autenticación. |

### 5. Controladores y servicios

- Crear controladores para las rutas de productos y autenticación.
- Crear servicios que atiendan las solicitudes de los controladores y conecten la lógica de la aplicación con los modelos.

### 6. Acceso a los datos

- Crear la capa de modelos.
- Crear un proyecto de Firestore en Firebase y una colección para los productos.
- Crear un documento inicial de producto que establezca la estructura y los tipos de datos.
- Configurar y conectar Firebase con la aplicación.
- Implementar en el modelo los métodos necesarios para interactuar con la base de datos remota.
- Conectar los servicios con los modelos.

### 7. Protección de rutas

- Configurar JWT en el proyecto.
- Crear un middleware de autenticación y proteger las rutas correspondientes.
- Implementar la lógica del controlador de login para validar la identidad del usuario y devolver un Bearer token.

## Manejo de errores

La aplicación debe responder de manera clara y con códigos HTTP apropiados, incluyendo:

- `400` para solicitudes con datos inválidos o errores del cliente.
- `401` para errores de autenticación.
- `403` cuando el usuario está autenticado, pero no tiene autorización para acceder al recurso.
- `404` para rutas no definidas o recursos inexistentes.
- `500` cuando ocurre un error interno o un servicio externo de datos no responde.

## Arquitectura objetivo

Separar responsabilidades en capas y carpetas claras para:

- Rutas.
- Controladores.
- Servicios.
- Modelos.
- Middlewares.
- Configuración e integración con servicios externos.

## Alcance y estrategia

Esta consigna define el estado final esperado; no implica que todas las partes estén implementadas actualmente. Conviene avanzar por etapas, manteniendo la separación de responsabilidades y verificando cada funcionalidad antes de incorporar la siguiente: CRUD de productos, persistencia en Firestore, login/JWT, protección de rutas y manejo global de errores.
