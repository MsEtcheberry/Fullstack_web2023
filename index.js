var http = require('http'); //instancio la variable http donde voy a cargar el módulo http que tiene node (todos los atributos y métodos del módulo)
var random = require('./moduloPrueba')
http.createServer(function (req, res) {  //Uso el método de crear servidor del objeto http. En el parámetro tiene un callback que va a recibir una request y una respuesta
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(random.caraOCruz());
}).listen(8080);