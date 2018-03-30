var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();


//middleware
/*var logger = function(req, res, next) {
    console.log('Logging...');
    next();
}

app.use(logger);*/


//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'vistas'));


//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//recursos estaticos
app.use(express.static(path.join(__dirname, 'publico')));




//routing
//puro contenido dinamico
/*app.get('/', function(req, res) {

    res.send('Hola mundo');

});*/


//routing 
//JSON
/*var persona = {
    nombre: 'A. Alfonso F. R.',
    edad: 45
};

app.get('/', function(req, res) {

    res.json(persona);


});*/


//routing contenido dinamico templates
app.get('/', function(req, res) {

    res.render('index', { titulo: " Hola Mundo" });

});


app.post('/clasi/ajusta', function(req, res) {

    console.log(req.body.nombre);
    res.render('index', { titulo: "Entrada: " + req.body.nombre });
});


app.listen(3000, function() {
    console.log("escucha 3000");
});