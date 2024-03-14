<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descripión

Este es el documento explicativo del proyecto "Synergy Connect". Este es un proyecto que nace con la idea de realizar una web que tenga una función de facilitar el trabajo de equipos y la comunicación entre los miembros.
En el backend contaremos con los servicios para utilizar las funciones propias de un CRUD de notas que se gestionarán con la base de datos de Mongo DB. También existirán las funciones para gestionar información acerca de los usuarios conectados. 
El lado del cliente por su parte contará con 3 secciones en la web:
1ª Información y explicación de la web, donde se podrán consultar las personas conectadas al dominio
2ª Tablero de notas con las tareas por hacer
3ª Foro donde cualquier persona pueda escribir un mensaje para todas las personas conectadas.


## Instalación

#### 1. Clonar el repositorio o descomprimir el zip del proyecto.



#### 2. Instalar las dependencias de node package manager
```
npm install
```
#### 3. Instalar Docker desktop y que esté ejecutándose. Levantar el servicio de docker con el siguiente comando: 

```
docker-compose up -d   
```

#### 4. Levantar el servidor

```bash
# watch mode
$ npm run start:dev
```

## Endpoints disponibles

## CRUD de Notas

### Crear una Nota
- **Método:** `POST`
- **Ruta:** `/notas`
- **Descripción:** Crea una nueva nota con los datos proporcionados.
- **Parámetros:**
  - `id` (string): Identificador único de la nota.
  - `createCrudNoteDto` (object): Datos de la nota a crear.
- **Respuesta:** Retorna la nota creada.

### Obtener Todas las Notas
- **Método:** `GET`
- **Ruta:** `/notas`
- **Descripción:** Obtiene todas las notas existentes.
- **Respuesta:** Retorna un array con todas las notas.

### Obtener una Nota por ID
- **Método:** `GET`
- **Ruta:** `/notas/:id`
- **Descripción:** Obtiene una nota específica según su ID.
- **Parámetros:**
  - `id` (string): Identificador único de la nota.
- **Respuesta:** Retorna la nota encontrada o devuelve un error si no se encuentra.

### Actualizar una Nota
- **Método:** `PUT`
- **Ruta:** `/notas/:id`
- **Descripción:** Actualiza una nota existente según su ID.
- **Parámetros:**
  - `updateCrudNoteDto` (object): Datos actualizados de la nota.
- **Respuesta:** Retorna la nota actualizada.

### Eliminar una Nota
- **Método:** `DELETE`
- **Ruta:** `/notas/:id`
- **Descripción:** Elimina una nota existente según su ID.
- **Parámetros:**
  - `id` (string): Identificador único de la nota a eliminar.
- **Respuesta:** Retorna un mensaje de éxito o un error si la nota no se encuentra.

## Endpoints del Servidor y de Usuarios

### Registrar Cliente
- **Método:** `POST`
- **Ruta:** `/registrar-cliente`
- **Descripción:** Registra un nuevo cliente conectado al servidor.
- **Parámetros:**
  - `client` (object): Datos del cliente a registrar.
- **Respuesta:** No hay respuesta definida.

### Eliminar Cliente
- **Método:** `DELETE`
- **Ruta:** `/eliminar-cliente/:id`
- **Descripción:** Elimina un cliente registrado del servidor según su ID.
- **Parámetros:**
  - `id` (string): Identificador único del cliente a eliminar.
- **Respuesta:** No hay respuesta definida.

### Obtener Cliente Conectado
- **Método:** `GET`
- **Ruta:** `/cliente/:id`
- **Descripción:** Obtiene los detalles de un cliente conectado según su ID.
- **Parámetros:**
  - `id` (string): Identificador único del cliente.
- **Respuesta:** Retorna los detalles del cliente o `null` si no se encuentra.

### Obtener Cantidad de Clientes Conectados
- **Método:** `GET`
- **Ruta:** `/cantidad-clientes`
- **Descripción:** Obtiene la cantidad total de clientes conectados al servidor.
- **Respuesta:** Retorna un número entero representando la cantidad de clientes.

### Obtener Clientes Conectados
- **Método:** `GET`
- **Ruta:** `/clientes-conectados`
- **Descripción:** Obtiene los IDs de todos los clientes actualmente conectados al servidor.
- **Respuesta:** Retorna un array con los IDs de los clientes conectados.

## Stack usado
![HTML5](https://img.shields.io/badge/-HTML5-%23E44D27?style=flat-square&logo=html5&logoColor=ffffff)
![CSS3](https://img.shields.io/badge/-CSS3-%231572B6?style=flat-square&logo=css3)
![Nodejs](https://img.shields.io/badge/-Nodejs-339933?style=flat-square&logo=Node.js&logoColor=ffffff)
![Nest](https://img.shields.io/badge/-Nest-000000?style=flat-square&logo=NestJS&logoColor=E0234E)
![MongoDB](https://img.shields.io/badge/-Mongodb-563D7C?style=flat-square&logo=Mongodb)
![Vue](https://img.shields.io/badge/-Vue-181717?style=flat-square&logo=vue)
![Git](https://img.shields.io/badge/-Git-%23F05032?style=flat-square&logo=git&logoColor=%23ffffff)
![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github)
