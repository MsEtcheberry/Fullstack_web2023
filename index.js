/*var http = require('http'); //instancio la variable http donde voy a cargar el módulo http que tiene node (todos los atributos y métodos del módulo)
var random = require('./moduloPrueba')
http.createServer(function (req, res) {  //Uso el método de crear servidor del objeto http. En el parámetro tiene un callback que va a recibir una request y una respuesta
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(random.caraOCruz());
}).listen(8080);*/


//const env = require("dotenv");
const express = require("express");
const app = express()    // Instancio el server
const http = require("http").createServer(app);
const dotenv = require('dotenv').config()
const PORT = process.env.PORT  //Se define el puerto



app.use(express.json());    //Para utilizar json

// Acceso a db
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = process.env.DB_URL
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
client.connect(err => {
    const collection = client.db("Fullstack_db").collection("characters");
    client.close();
});



http.listen(PORT, () => {       //Escucho el puerto
    console.log(`listening to ${PORT}`);   //Console log para saber que puerto estoy escuchando
})


app.get("/characters", async (req, res) => {
    let { limit = 5, offset = 0 } = req.params;
    console.log(limit);
    try {
        let result = await collection.find({}).skip(parseInt(offset)).limit(parseInt(limit)).toArray();
        console.log(result);
        res.json({ characters: result });
    } catch (error) {
        console.log(error);
        let response = { 'status': 500, 'message': "Error de conexión." }
        res.json({ response: response })
    }
})


app.get("", async (req, res) => {
    res.json("Bienvenidos!");
})
