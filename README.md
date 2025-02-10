# Proyecto de Administración de Alumnos en un Centro Educativo

## Descripción

El proyecto consiste en una aplicación web (solo Backend) que gestiona el control de alumnos de un centro educativo. El sistema está desarrollado con **NodeJS**, **MongoDB**, y **Express**. Se utiliza **Bcrypt**, **Mongoose** y **JWT** para el manejo de contraseñas, base de datos y autenticación, respectivamente.

La aplicación tiene dos roles:
- **TEACHER_ROLE**: para los maestros.
- **STUDENT_ROLE**: para los estudiantes.

### Funcionalidades Principales

#### Funciones del Alumno (STUDENT_ROLE):
1. **Registro y Login**: El alumno puede registrarse con el rol de `STUDENT_ROLE` y autenticarse mediante login.
2. **Asignación de Cursos**: El alumno puede asignarse hasta 3 cursos.
   - No puede asignarse a un curso que ya tenga asignado.
3. **Visualización de Cursos**: El alumno puede ver los cursos a los que está asignado.
4. **Edición y Eliminación de Perfil**: El alumno puede editar y eliminar su perfil de usuario.

#### Funciones del Maestro (TEACHER_ROLE):
1. **Registro y Login**: El maestro puede registrarse con el rol de `TEACHER_ROLE` y autenticarse mediante login.
2. **Gestión de Cursos**: El maestro puede:
   - Crear, editar y eliminar cursos.
   - Visualizar los cursos que ha creado.
3. **Modificación de Cursos con Alumnos Asignados**:
   - Al modificar un curso con alumnos asignados, se actualizarán los cursos de los alumnos.
4. **Eliminación de Cursos con Alumnos Asignados**:
   - Si un curso se elimina, los alumnos asignados a ese curso se desasignarán automáticamente.

## Tecnologías Utilizadas

- **NodeJS**: Plataforma para ejecutar el backend.
- **Express**: Framework para la creación del servidor y manejo de rutas.
- **MongoDB**: Base de datos NoSQL para almacenar la información de usuarios y cursos.
- **Mongoose**: Librería para interactuar con MongoDB de manera más estructurada.
- **Bcrypt**: Librería para encriptar y comparar contraseñas de manera segura.
- **JWT (JSON Web Tokens)**: Utilizado para la autenticación y autorización de los usuarios.
- **Multer**: Middleware para manejar la carga de archivos (en este caso, las imágenes de perfil).

## Endpoints

### Rutas de Autenticación
- **POST /register**: Registro de un nuevo usuario (Alumno o Maestro).
  - **Body**: 
    ```json
    {
      "name": "John",
      "surname": "Doe",
      "username": "john_doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "profilePicture": "<imagen>",
      "role": "STUDENT_ROLE",
      "phone": "12345678"
    }
    ```
- **POST /login**: Login de un usuario registrado.
  - **Body**: 
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```

### Rutas de Usuarios (Alumnos y Maestros)
- **GET /user**: Obtener todos los usuarios registrados.
- **GET /user/findUser/:uid**: Obtener un usuario específico por ID.
- **PUT /user/updateUser/:uid**: Actualizar los datos de un usuario.
  - **Body**: 
    ```json
    {
      "name": "John",
      "surname": "Doe",
      "username": "john_doe_updated",
      "email": "john.doe.updated@example.com",
      "phone": "12345678"
    }
    ```
- **PATCH /user/updatePassword/:uid**: Cambiar la contraseña de un usuario.
  - **Body**: 
    ```json
    {
      "password": "newpassword123"
    }
    ```
- **DELETE /user/deleteUser/:uid**: Eliminar un usuario por ID.

### Rutas de Cursos (Para Maestros)
- **POST /course/createCourse**: Crear un nuevo curso.
  - **Body**: 
    ```json
    {
      "name": "Course Name",
      "description": "Course Description"
    }
    ```
- **GET /course/coursesByTeacher**: Obtener los cursos que un maestro ha creado.
- **PUT /course/updateCourse/:courseId**: Editar un curso existente.
  - **Body**: 
    ```json
    {
      "name": "Updated Course Name",
      "description": "Updated Description"
    }
    ```
- **DELETE /course/deleteCourse/:courseId**: Eliminar un curso.
- **POST /course/assignCourse/:uid**: Asignar un curso a un alumno.
  - **Body**: 
    ```json
    {
      "courseId": "<course_id>"
    }
    ```

## Características Adicionales
1. **Autenticación con JWT**: Utiliza JSON Web Tokens (JWT) para la autenticación de usuarios, asegurando que solo los usuarios autenticados puedan acceder a las rutas protegidas.
2. **Roles y Autorización**: Las rutas están protegidas por roles (`TEACHER_ROLE` y `STUDENT_ROLE`) para garantizar que solo los usuarios con el rol adecuado puedan realizar ciertas acciones.
3. **Manejo de Errores**: El sistema incluye manejo adecuado de errores para garantizar una respuesta clara y precisa cuando ocurre algún problema, como la falta de autenticación o la asignación incorrecta de cursos.

## Instalación

### Requisitos
- **Node.js** (versión 14 o superior)
- **MongoDB** (local o en la nube)

### Pasos para la instalación

1. Clona el repositorio:
   ```bash
   git clone <repositorio_url>
