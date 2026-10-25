# API REST del curso

API de aprendizaje construida con **Node.js** y **Express** para administrar productos y categorías. El proyecto organiza el código en rutas, controladores y modelos para separar responsabilidades.

## Requisitos

- Node.js y npm instalados.

## Instalación y ejecución

Desde la carpeta del proyecto:

```bash
npm install
npm start
```

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
    categories.controller.js
    products.controller.js
  models/
    categories.model.js
    products.model.js
  routes/
    categories.router.js
    products.router.js
```

- **Rutas:** asocian métodos HTTP y URLs con funciones del controlador.
- **Controladores:** reciben las solicitudes, validan datos básicos y preparan las respuestas.
- **Modelos:** contienen y modifican los datos. Actualmente se guardan en arreglos en memoria; se reinician al detener el servidor.

## Endpoints de categorías

La base de rutas es `/api/categories`.

| Método | Endpoint | Descripción | Respuesta habitual |
| --- | --- | --- | --- |
| GET | `/api/categories` | Lista todas las categorías | `200` |
| GET | `/api/categories/:id` | Obtiene una categoría por ID | `200`, `400` o `404` |
| POST | `/api/categories` | Crea una categoría | `201` o `400` |
| PUT | `/api/categories/:id` | Actualiza el nombre de una categoría | `200`, `400` o `404` |
| DELETE | `/api/categories/:id` | Elimina una categoría | `204`, `400` o `404` |

### Crear una categoría

Solicitud `POST /api/categories`, con `Content-Type: application/json`:

```json
{
  "name": "librería"
}
```

Respuesta de ejemplo (`201 Created`):

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

| Método | Endpoint | Descripción | Respuesta habitual |
| --- | --- | --- | --- |
| GET | `/api/products` | Lista los productos | `200` |
| GET | `/api/products?categoryId=1` | Lista productos de una categoría | `200` |
| GET | `/api/products/:id` | Obtiene un producto por ID | `200`, `400` o `404` |
| POST | `/api/products/create` | Crea un producto | `201` o `400` |
| PUT | `/api/products/:id` | Reemplaza los datos de un producto | `200`, `400` o `404` |
| DELETE | `/api/products/:id` | Elimina un producto | `204`, `400` o `404` |

Para crear un producto, enviá `POST /api/products/create` con este cuerpo JSON:

```json
{
  "name": "Auriculares",
  "price": 100,
  "categoryId": 1
}
```

Para actualizar un producto, enviá `PUT /api/products/1` con los mismos campos (`name`, `price` y `categoryId`). La categoría indicada debe existir. El precio debe ser un número igual o mayor que cero.

La API también permite eliminar un producto con `DELETE /api/products/1`. Si la eliminación es correcta, responde `204 No Content` sin cuerpo.

## Respuestas de error

- `400 Bad Request`: ID inválido, faltan campos requeridos, el precio no es válido o la categoría indicada no existe.
- `404 Not Found`: no se encontró el producto o la categoría solicitada.
- `204 No Content`: se eliminó una categoría correctamente; no incluye cuerpo.

## Nota sobre almacenamiento

Los datos son de ejemplo y se guardan en memoria. No hay una base de datos configurada, por lo que los cambios se pierden al reiniciar la aplicación. Además, se puede borrar una categoría aunque existan productos con ese `categoryId`.
