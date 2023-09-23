//const env = require("dotenv");
const express = require("express");
const app = express();    // Instancio el server
const http = require("http").createServer(app); //instancio la variable http donde voy a cargar el módulo http que tiene node (todos los atributos y métodos del módulo)
const dotenv = require('dotenv').config();
const cors = require("cors");
const mongoose = require("mongoose");  //ORM de mongo, permite definir modelos
const PORT = process.env.PORT  //Se define el puerto
const uri = process.env.DB_URI

const UserController = require("./controllers/user")
const CharacterController = require("./controllers/character")


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected");
}).catch((err) => console.log(err))
app.use(cors())
app.use(express.json());    //Para utilizar json y responder las consultas


// Acceso a db
const { MongoClient, ServerApiVersion } = require('mongodb');
const { connected } = require("process");

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})
client.connect(err => {
    //const usersCollection = client.db("Fullstack_db").collection("users");
    client.close();
});

const usersCollection = client.db("Fullstack_db").collection("users");
const charactersCollection = client.db("Fullstack_db").collection("characters");


http.listen(PORT, () => {                  // Escucho el puerto
    console.log(`listening to ${PORT}`);   // Console log para saber que puerto estoy escuchando
})

app.get("/users", async (req, res) => {
    let limit = 5;
    let offset = 0;
    try {
        const results = await UserController.getAllUsers(limit, offset);
        res.status(200).json(results);
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.get("/characters", async (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;

    try {
        const results = await CharacterController.getAllCharacters(limit, offset);
        res.status(200).json(results);
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.get("/", async (req, res) => {
    res.json("Bienvenidos!");
})
