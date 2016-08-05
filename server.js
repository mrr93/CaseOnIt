// Incluímos las dependencias que vamos a usar
var express = require("express"),
    app     = express(),
    http    = require("http"),
    server  = http.createServer(app),
    mongoose = require("mongoose");

// Configuramos la app para que pueda realizar métodos REST
app.configure(function () {
  app.use(express.bodyParser());
  app.use(app.router);
});

// Conexion con el modelo de datos
routes = require('./routes/ciudades')(app);

// Conexión
mongoose.connect('mongodb://localhost/ciudades', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

// petición GET que sólo muestre "Prueba Técnica Case On It"
app.get('/', function(req, res) {
  res.send("Prueba Técnica Case On It");
});

// El servidor escucha en el puerto 3000
server.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});