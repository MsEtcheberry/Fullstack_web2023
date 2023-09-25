# Fullstack Web 2C2023 Martín Etcheberry
***
Api REST para el desarrollo de un sitio web en el que se pueden crear personajes seleccionando el atuendo del día.


# Correr el servidor:
## Instalación
Primero debe clonarse el repositorio de manera local e instalar las dependencias.

1-  git clone https://github.com/MsEtcheberry/Fullstack_web2023.git

2-  ```npm install```

3-  ```npm start```

4- Luego debe crearse un archivo .env en la carpeta root siguiendo el modelo del .env.example. Deben completarse los siguientes datos:


```
    PORT = _____ (Ingresar número de puerto a utilizar)
    DB_URI = ______ (Ingresar connection string de MongoDB)
    TOKEN_KEY ______ (Ingresar una key aleatoria)
```

5- Finalmente usar el comando 'node index.js' para correr el servidor.

### Características de la api
### Endpoints públicos:


### +POST('auth/login)


-Respuestas:
* 200 (Success). Devuelve un atributo Token válido por 1 hora para el futuro uso de endpoints privados
        
            
            {
                "token":"xxxxxxxxxxx"
            }
           
            
* 401 (Fail). Se ingresaron credenciales incorrectas
  
* 500 Error interno del servidor.
    
-Ejemplo: 
        Ruta:``` http://localhost:<PORT>/auth/login```
        Body: ```{
                "email":"prueba@fullstack.com",
                "password":"123456"
            }```


### +GET('/users')

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
        Ruta: ```http://localhost:<PORT>/users```


### +GET('/users/:id)


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
        Ruta: ```http://localhost:<PORT>/users/65118a2f254c8e65ca5b3563```


### +GET('/users/id/characters')

-Requiere pasar el ID del usuario como parámetro en la URL

-Puede pasarse limit y offset mediante la URL.

-Respuestas:

*200 (Success) Devuelve un array de personajes creados por el usuario indicado.

*404 No se encontró un usuario con el Id indicado.

*500 Error interno del servidor.

Ejemplo:
        Ruta: ```http://localhost:<PORT>/users/65118a2f254c8e65ca5b3563/characters```


### +POST('/users')

-Crea un nuevo usuario.

-Requiere que le pasen mediante el body de la request los siguientes datos (Todos son de tipo String): name, lastname, nickname, email, password.


-Respuestas: 

*201 (Success) El usuario se creó con éxito

*409 No pudo crearse el usuario ya que hay datos faltantes o el mail ya se encuentra tregistrado.

*500 Error interno del servidor
    

Ejemplo:

Ruta: ```http://localhost:<PORT>/users```

Body: 
        ```{
                "name":"Prueba3",
                "lastname": "fullstack",
                "nickname": "pFullstack",
                "email": "prueba3@fullstack.com",
                "password": "1234567"
              }```


### +GET('/characters')

-Devuelve los últimos 5 personajes creados independientemente de los usuarios creadores

-Respuestas:

*200 (Success). Devuelve un array con últimos 5 personajes.

*500 Error interno del servidor.

Ejemplo:

Ruta: ```http://localhost:<PORT>/characters```



### +GET('characters/id')

-Requiere pasar el ID del personaje como parámetro en la URL

-Respuestas:

*200 (Success). Devuelve el personaje 

*404 No se encontró un personaje con el Id especificado.

*500 Error interno del servidor.

Ejemplo: 
        Ruta: ```http://localhost:<PORT>/characters/6511835f10e481e9c3eceda8```



### +GET('/clothing')

-Se puede pasar Limit y Offset como parámetros en la url

-Respuestas:

*200 (Success). Devuelve un array de vestimentas.

    [{
        "displayName": "Remera 1",
        "imgUrl": "url",
        "type": "UPPER",
        "id": "650f3d2868ba8caa460b2f0a"
    }]
    
*500 Error interno del servidor.

Ejemplo:

Ruta: ```http://localhost:<PORT>/clothing```


### +GET('clothing/:type')

-Requiere pasar el tipo de vestimenta como parámetro en la URL.

TENER EN CUENTA que los tipos de vestimenta posible son: UPPER, BASE_CHARACTER, BOTTOM y SHOES.

-Respuestas:

*200 (Success). Devuelve un array con las vestimentas del tipo indicado. 
    
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

Ruta: ```http://localhost:<PORT>/clothing/UPPER```

## Enpoints Privados
### Requieren enviar un Token válido en el header de la request para publicar/actualizar los registros.

#### POST('/characters')

-Requiere pasar los siguientes datos obligatorios dentro del body de la request: userId (String), displayName (String), baseCharacter (Object), upperClothing (Object), bottomClothing (Object), shoes (Object)

-Respuestas:

*200 (Success). El personaje fue creado correctamente. 
        
*409 Error El usuario ya tiene un personaje creado con el mismo displayName o hubo datos faltantes.

*500 Error interno del servidor.

Ejemplo:

Ruta: ```http://localhost:<PORT>/characters```

Request Body:
```
{
    "userId":"6510b25defa44d29a20f6daa",
    "displayName": "Taylor swift - Fearless (Taylor´s version)",
    "baseCharacter": {
        "displayName": "Taylor Swift - skin",
        "imgUrl": "url",
        "type": "BASE_CHARACTER",
        "id": "651068f040dbff0788bc352b"
    },
    "upperClothing":{
        "displayName": "Remera 2",
        "imgUrl": "url",
        "type": "UPPER",
        "id": "650f3d7c68ba8caa460b2f0c"
    },
    "bottomClothing": {
        "displayName": "Pantalones 1",
        "imgUrl": "url",
        "type": "BOTTOM",
        "id": "6510695b40dbff0788bc3531"
    },
    "shoes":{
        "displayName": "Zapatos 2",
        "imgUrl": "url",
        "type": "SHOES",
        "id": "651069af40dbff0788bc3536"
    }
}
```

#### PUT('/characters/:id'+)

-Requiere pasar el personaje con los nuevos valores.

-Respuestas:

*200 (Success). El personaje fue actualizado correctamente. 
        
*404 Error No se encontró el personaje a modificar.

*500 Error interno del servidor.

Ejemplo:

Ruta: ```http://localhost:<PORT>/characters/6510fb0f7f466b0e2c0e0114```

Request Body:
```
{
        "displayName": "Taylor swift - 1989 (Taylor´s version)",
        "userId": "6510b25defa44d29a20f6daa",
        "baseCharacter": {
            "displayName": "Taylor Swift - skin",
            "imgUrl": "url",
            "type": "BASE_CHARACTER",
            "id": "651068f040dbff0788bc352b"
        },
        "upperClothing": {
            "displayName": "Remera 2",
            "imgUrl": "url",
            "type": "UPPER",
            "id": "650f3d7c68ba8caa460b2f0c"
        },
        "bottomClothing": {
            "displayName": "Pantalones 1",
            "imgUrl": "url",
            "type": "BOTTOM",
            "id": "6510695b40dbff0788bc3531"
        },
        "shoes": {
            "displayName": "Zapatos 2",
            "imgUrl": "url",
            "type": "SHOES",
            "id": "651069af40dbff0788bc3536"
        },
        "createdAt": "2023-09-25T03:14:23.893Z",
        "updatedAt": "2023-09-25T03:14:23.893Z",
        "__v": 0,
        "id": "6510fb0f7f466b0e2c0e0114"
}
```

#### PUT('/users/:id')

-Requiere pasar el usuario con los nuevos valores.

-Respuestas:

*200 (Success). El usuario fue actualizado correctamente. 
        
*404 Error No se encontró el usuario a modificar.

*500 Error interno del servidor.

Ejemplo:

Ruta: ```http://localhost:<PORT>/users/6511f468ca3cdb428f7a73e4```

Request Body:
```
{
 
    "email": "prueba2@fullstack.com",
    "nickname": "pFullstack",
    "name": "Prueba_actualizado",
    "lastName": "fullstack"
       
}
```

#### DELETE('/users/:id')

-Requiere pasar el id del usuario a borrar mediante la URL. Elimina al registro de la base de datos

-Respuestas:

*200 (Success). El usuario fue borrado correctamente. 
        
*404 Error No se encontró el usuario a eliminar.

*500 Error interno del servidor.

Ejemplo:

Ruta: ```http://localhost:<PORT>/users/6511f468ca3cdb428f7a73e4```

