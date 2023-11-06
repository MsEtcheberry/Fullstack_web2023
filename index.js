const express = require("express");
const app = express();    // Instancio el server
const http = require("http").createServer(app); //instancio la variable http donde voy a cargar el módulo http que tiene node (todos los atributos y métodos del módulo)
const dotenv = require('dotenv').config();
const cors = require("cors");
const mongoose = require("mongoose");  //ORM de mongo, permite definir modelos
const middleware = require('./middleware/auth-middleware');
//Variables .env
const PORT = process.env.PORT  //Se define el puerto
const uri = process.env.DB_URI

//Controladores
const UserController = require("./controllers/user");
const CharacterController = require("./controllers/character");
const AuthController = require('./controllers/auth');
const ClothingController = require('./controllers/clothing');

app.use(cors());
app.use(express.json());    //Para utilizar json y responder las consultas


// Acceso a db
const { MongoClient, ServerApiVersion } = require('mongodb');
const { connected } = require("process");


//Conexión con MongoDB/Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected");
}).catch((err) => console.log(err));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})
client.connect(err => {

    client.close();
});

//Escuchar puerto
http.listen(PORT, () => {
    console.log(`listening to ${PORT}`);   // Console log para saber que puerto estoy escuchando
})


//Endpoint General
app.get("/", async (req, res) => {
    res.json({ message: "Bienvenidos!" });
})

//Endpoints de usuarios
//GET
app.get("/users", async (req, res) => {

    let limit = req.query.limit;
    let offset = req.query.offset;
    try {
        const results = await UserController.getAllUsers(limit, offset);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).send(err);
    }
})

app.get("/users/:id", async (req, res) => {
    let id = req.params.id;

    try {
        const user = await UserController.getUser(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send({ message: "No se encontró el usuario indicado" });
        }
    } catch (err) {
        res.status(500).send({ message: "Error al intentar traer el usuario. Intente luego" });
    }
})

app.get("/users/:id/characters", async (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;
    let userId = req.params.id;
    try {
        const user = await UserController.getUser(userId);
        if (!user) {
            res.status(404).send({ message: "Perdón. No se encontró el usuario indicado." });
        }
        const characters = await CharacterController.getCharactersForUser(userId, limit, offset);
        if (characters) {
            res.status(200).json(characters);
        } else {
            res.status(404).send({ message: "No se encontró el usuario indicado." });
        }
    } catch (err) {
        res.status(500).send({ message: "Hubo un error al intentar buscar los personajes. Intente luego." });
    }

})

//DELETE (Borra el registro de la base)
app.delete("/users/:id", middleware.verify, async (req, res) => {

    let id = req.params.id;

    try {
        const user = await UserController.deleteUser(id)
        if (user) {
            res.status(204).send("El usuario fue borrado con exito.");
        } else {
            res.status(404).send("El usuario no fue encontrado, por lo que no pudo borrarse.")
        }
    } catch (err) {
        res.status(500).send("Hubo un error al intentar eliminar el usuario, intente luego.")
    }
})

//POST
app.post("/users", async (req, res) => {
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let nickname = req.body.nickname;
    let password = req.body.password;

    try {
        const result = await UserController.addUser(name, lastname, email, nickname, password);
        if (result) {
            res.status(201).send({ message: "¡El usuario fue creado correctamente!" });
        } else {
            res.status(409).send({ message: "No puedo crearse el usuario (Datos faltantes o ya hay un usuario con el email indicado)" });
        }
    } catch (err) {
        res.status(500).send({ message: "Error al crear el usuario. Intente luego" });
    }

})

//PUT
app.put("/users/:id", middleware.verify, async (req, res) => {
    const user = { _id: req.params.id, name: req.body.name, lastname: req.body.lastname, email: req.body.email, nickname: req.body.nickname }

    try {
        const updatedUser = await UserController.editUser(user);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).send({ message: "El usuario a modificar no fue encontrado" });
        }
    } catch (err) {
        res.status(500).send({ message: "Hubo un error al intentar modificar el usuario. Intente luego." })
    }
})


//Endpoints de Personajes
//GET
app.get("/characters", async (req, res) => {
    try {
        const results = await CharacterController.getLatestCharacters();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).send({ message: "Hubo un error al intentar recuperar los personajes. Intente luego." });
    }
})

app.get("/characters/:id", async (req, res) => {
    let id = req.params.id;

    try {
        const character = await CharacterController.getCharacter(id);
        if (character) {
            res.status(200).json(character);
        } else {
            res.status(404).send({ message: "No se encontró el personaje solicitado." });
        }
    } catch (err) {
        res.status(500).send({ message: "Hubo un error al intentar traer el personaje. Intente luego." });
    }
})

//POST
app.post("/characters", middleware.verify, async (req, res) => {
    let userId = req.body.userId;
    let displayname = req.body.displayName;
    let baseCharacter = req.body.baseCharacter
    let upperClothing = req.body.upperClothing;
    let bottomClothing = req.body.bottomClothing;
    let shoes = req.body.shoes;

    try {
        const character = await CharacterController.addCharacter(userId, displayname, baseCharacter, upperClothing, bottomClothing, shoes)
        if (character) {
            res.status(201).send({ message: "¡El personaje fue creado con éxito!" })
        } else {
            res.status(409).send({ message: "Error al intentar crear el personaje." })
        }
    } catch (err) {
        res.status(500).send({ message: "Hubo un error al intentar crear el personaje. Intente luego." })
    }
})

//PUT
app.put("/characters/:id", middleware.verify, async (req, res) => {
    const character = { _id: req.params.id, userId: req.body.userId, displayName: req.body.displayName, baseCharacter: req.body.baseCharacter, upperClothing: req.body.upperClothing, bottomClothing: req.body.bottomClothing, shoes: req.body.shoes }

    try {
        const updatedCharacter = await CharacterController.updateCharacter(character);
        if (updatedCharacter) {
            res.status(200).json(updatedCharacter);
        } else {
            res.status(404).send({ message: "El personaje que se intentó modificar no fue encontrado" });
        }
    } catch (err) {
        res.status(500).send({ message: "Hubo un error al intentar modificar el personaje. Intente luego." })
    }
})


//Endpoints de Vestimentas
//GET
app.get("/clothing", async (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;
    try {
        const results = await ClothingController.getAllClothing(limit, offset);
        res.status(200).json(results)
    } catch (err) {
        res.status(500).send({ message: "Hubo un error al recuperar la vestimenta. Intente luego." })
    }
})

app.get("/clothing/:type", async (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;
    let type = req.params.type;

    try {
        const results = await ClothingController.getClothingByType(type, limit, offset);
        res.status(200).json(results)
    } catch (err) {
        res.status(500).send({ message: "Hubo un error al recuperar la vestimenta. Intente luego." })
    }
})

app.get("/clothing/:id", async (req, res) => {
    let id = req.params.id;

    try {
        const clothing = await ClothingController.getClothing(id);
        if (clothing) {
            res.status(200).json(clothing);
        } else {
            res.status(404).send({ message: "No se encontró la vestimenta solicitada." });
        }
    } catch (err) {
        res.status(500).send({ message: "Hubo un error al intentar traer la vestimenta. Intente luego." });
    }
})

//Endpoints de login
//POST
app.post("/auth/login", async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    try {
        const result = await AuthController.login(email, password);
        if (result) {
            res.status(200).json({ data: result });
        } else {
            res.status(401).send({ message: "Credenciales incorrectas" })
        }
    } catch (err) {
        res.status(500).send({ message: "Error interno del servidor" });
    }
})
