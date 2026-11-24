# API REST del curso

API de aprendizaje construida con **Node.js** y **Express** para administrar productos y categorías. El proyecto organiza el código en rutas, controladores y modelos para separar responsabilidades.

## Demo desplegada

La API está desplegada en Vercel: [https://nodejs-26226-entrega-final-natalia.vercel.app](https://nodejs-26226-entrega-final-natalia.vercel.app). Para probar los endpoints, agregá las rutas documentadas abajo a esta URL base.

## Requisitos

- Node.js y npm instalados.

## Instalación y ejecución

Desde la carpeta del proyecto:

```bash
npm install
npm start
```

Antes de iniciar la API, creá `.env` a partir de `.env.example` y completá las variables de Firebase y `JWT_SECRET` con los valores de tu entorno. No subas `.env` a GitHub. Si cambiás variables con el servidor en ejecución, reinicialo.

Para desarrollo, también podés iniciar el servidor con reinicio automático al guardar cambios:

```bash
npm run dev
```

El servidor se inicia en `http://localhost:3000`. La ruta raíz `GET /` devuelve un mensaje para comprobar que Express está funcionando.

## Estructura

```text
index.js
src/
  controllers/
    auth.controller.js
    categories.controller.js
    products.controller.js
  middlewares/
    auth.middleware.js
    error.middleware.js
  models/
    categories.model.js
    products.model.js
    user.model.js
  routes/
    auth.routes.js
    categories.router.js
    products.router.js
  services/
    auth.service.js
    categories.service.js
    http-error.service.js
    products.service.js
```

- **Rutas:** asocian métodos HTTP y URLs con funciones del controlador.
- **Controladores:** reciben las solicitudes, preparan respuestas y delegan la lógica al servicio correspondiente.
- **Servicios:** contienen validaciones y reglas de negocio.
- **Modelos:** consultan y modifican productos, categorías y usuarios directamente en Firestore.
- **Middlewares:** validan JWT, rutas inexistentes y errores internos.

El catálogo se almacena en Firestore. No se requiere un archivo de datos local para iniciar ni usar los endpoints.

## Endpoints de categorías

La base de rutas es `/api/categories`.

Los IDs de categorías se mantienen numéricos para conservar la relación actual con `categoryId` en los productos. En Firestore se usan como IDs de documento (por ejemplo, `"1"`).

| Método | Endpoint | Descripción | Autenticación | Respuesta habitual |
| --- | --- | --- | --- | --- |
| GET | `/api/categories` | Lista todas las categorías | No requerida | `200` |
| GET | `/api/categories/:id` | Obtiene una categoría por ID | No requerida | `200`, `400` o `404` |
| POST | `/api/categories` | Crea una categoría | Bearer token | `201`, `400` o `401` |
| PUT | `/api/categories/:id` | Actualiza una categoría | Bearer token | `200`, `400`, `401` o `404` |
| DELETE | `/api/categories/:id` | Elimina una categoría | Bearer token | `204`, `401` o `404` |

### Crear una categoría

Solicitud `POST /api/categories`, con `Content-Type: application/json` y Bearer token válido:

```json
{
  "name": "librería"
}
```

Respuesta de ejemplo (`201 Created`; el ID depende de las categorías existentes):

```json
{
  "id": 4,
  "name": "librería"
}
```

### Actualizar una categoría

Solicitud `PUT /api/categories/4`:

```json
{
  "name": "libros"
}
```

La actualización requiere el campo `name`.

## Endpoints de productos

La base de rutas es `/api/products`.

| Método | Endpoint | Descripción | Autenticación | Respuesta habitual |
| --- | --- | --- | --- | --- |
| GET | `/api/products` | Lista los productos | No requerida | `200` |
| GET | `/api/products?categoryId=1` | Lista productos de una categoría | No requerida | `200` |
| GET | `/api/products/:id` | Obtiene un producto por ID de documento Firestore | No requerida | `200`, `400` o `404` |
| POST | `/api/products/create` | Crea un producto | Bearer token | `201`, `400` o `401` |
| PUT | `/api/products/:id` | Reemplaza los datos de un producto | Bearer token | `200`, `400`, `401` o `404` |
| DELETE | `/api/products/:id` | Elimina un producto | Bearer token | `204`, `401` o `404` |

Para crear un producto, enviá `POST /api/products/create` con Bearer token y este cuerpo JSON:

```json
{
  "name": "Auriculares",
  "price": 100,
  "categoryId": 1
}
```

Para actualizar un producto, enviá `PUT /api/products/ID_DOCUMENTO_FIRESTORE` con Bearer token y los mismos campos (`name`, `price` y `categoryId`). El ID del producto es el ID de documento de Firestore (una cadena), no necesariamente un número. La categoría indicada debe existir. El precio debe ser un número igual o mayor que cero.

La API también permite eliminar un producto con `DELETE /api/products/ID_DOCUMENTO_FIRESTORE` y Bearer token. Si la eliminación es correcta, responde `204 No Content` sin cuerpo.

## Endpoints de autenticación

La base de rutas es `/api/auth`.

| Método | Endpoint | Descripción | Respuesta habitual |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Registra un usuario | `201`, `400` o `409` |
| POST | `/api/auth/login` | Inicia sesión y entrega un JWT | `200`, `400` o `401` |

### Registro de usuario

Solicitud `POST /api/auth/register`, con `Content-Type: application/json`:

```json
{
  "email": "nuevo_usuario@example.com",
  "password": "contraseña_segura"
}
```

El email se normaliza y la contraseña se guarda como hash. La contraseña original no se devuelve ni se almacena en texto plano.

Respuesta de ejemplo (`201 Created`):

```json
{
  "message": "Usuario creado correctamente",
  "user": {
    "id": "ID_DOCUMENTO_FIRESTORE",
    "email": "nuevo_usuario@example.com"
  }
}
```

### Inicio de sesión

Solicitud `POST /api/auth/login`, con `Content-Type: application/json`:

```json
{
  "email": "nuevo_usuario@example.com",
  "password": "contraseña_segura"
}
```

Respuesta de ejemplo (`200 OK`):

```json
{
  "token": "jwt_token_aqui",
  "tokenType": "Bearer",
  "expiresIn": "1h",
  "user": {
    "id": "ID_DOCUMENTO_FIRESTORE",
    "email": "nuevo_usuario@example.com"
  }
}
```

Para probar una operación protegida, enviá el token con el encabezado:

```http
Authorization: Bearer jwt_token_aqui
```

Las operaciones de creación, actualización y eliminación de productos y categorías requieren ese encabezado.

## Respuestas de error

- `400 Bad Request`: datos inválidos o faltantes.
- `401 Unauthorized`: credenciales incorrectas, token ausente, inválido o expirado.
- `404 Not Found`: recurso inexistente o ruta no definida.
- `409 Conflict`: el email ya se encuentra registrado.
- `500 Internal Server Error`: falla interna o de configuración.
- `204 No Content`: se eliminó una categoría o producto correctamente; no incluye cuerpo.

El registro debe usar un email que todavía no esté cargado en la colección `users`. El token vence en una hora; para obtener otro, volvé a iniciar sesión.

## Nota sobre almacenamiento y seguridad

Los productos, categorías y usuarios se guardan en Firestore. Las operaciones de escritura requieren JWT y las rutas públicas son las consultas y autenticación. Las credenciales para Firebase y `JWT_SECRET` se configuran en `.env`, que no debe subirse al repositorio.
