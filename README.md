# Fullstack Web 2C2023 Martín Etcheberry
***
Api REST para el desarrollo de un sitio web en el que se pueden crear personajes seleccionando el atuendo del día.

## Herramientas/dependencias utilizadas
***
* node v16.14.0
* npm v.8.3.1 
* cors v2.8.5
* dotenv v16.3.1
* express v4.18.2
* jsonwebtoken v9.0.2
* mongodb v6.0.0
* mongoose v7.5.2

### La persistencia de datos está implementada con MongoDB

### Correr el servidor:
## Instalación
Primero debe clonarse el repositorio de manera local.
1-  git clone https://github.com/MsEtcheberry/Fullstack_web2023.git
2-  npm install
3-  npm start
4- Luego debe crearse un archivo .env en la carpeta root siguiendo el modelo del .env.example. Deben completarse los siguientes datos:
PORT = _____ (Ingresar número de puerto a utilizar)
DB_URI = ______ (Ingresar connection string de MongoDB siguiendo el formato mongodb+srv://<User>:<Password>@<Cluster>.sbfncma.mongodb.net/<DB_Name>?retryWrites=true&w=majority)
TOKEN_KEY ______ (Ingresar una key aleatoria)

5- Finalmente usar el comando 'node index.js' para correr el servidor.

### Características de la api
# Endpoints públicos:
--------Login-------
+POST('auth/login)
    -Respuestas:
        * 200 (Success). Devuelve un atributo Token válido por 2 horaspara el futuro uso de endpoints privados
            {
                "token":"xxxxxxxxxxx"
            }
        * 401 (Fail). Se ingresaron credenciales incorrectas
        * 500 Error interno del servidor.
    
    -Ejemplo: 
        Ruta: http://localhost:<PORT>/auth/login
        Body: {
                "email":"prueba@fullstack.com",
                "password":"123456"
            }

------Usuarios------
+GET('/users')
    -Se puede pasar Limit y Offset como parámetros en la url
    -Respuestas:
        *200 (Success). Devuelve un array de usuarios activos
            [{
                "email": "prueba@fullstack.com",
                "nickname": "pFullstack",
                "name": "Prueba",
                "lastName": "fullstack"
            }]
        *500 Error interno del servidor.
    Ejemplo:
        Ruta: http://localhost:<PORT>/users

+GET('/users/:id)
    -Requiere pasar el ID del usuario como parámetro en la URL
    -Respuestas:
        *200 (Success). Devuelve el usuario 
            {
                "email": "prueba@fullstack.com",
                "nickname": "pFullstack",
                "name": "Prueba",
                "lastName": "fullstack",
                "roles": [
                    "user"
                ],
                "isActive": true,
                "createdAt": "2023-09-25T13:25:03.051Z",
                "updatedAt": "2023-09-25T13:25:03.051Z",
                "__v": 0,
                "id": "65118a2f254c8e65ca5b3563"
            }
        *404 No se encontró un usuario activo con el Id especificado.
        *500 Error interno del servidor.
    Ejemplo:
        Ruta: http://localhost:<PORT>/users/65118a2f254c8e65ca5b3563

+get('/users/id/characters')
+post('/users')
------Personajes------
+get('/characters')
+get('characters/id')
------Vestimenta------
+get('/clothing')
+get('clothing/:type')

Endpoints privados:
------Usuarios------
-delete(/users/id)
------Personajes------
-post('/characters')

