var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')

var app = express()

var PATH_IMG = path.join(__dirname, 'publico/imagenes/')


// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// recursos estaticos
app.use(express.static(path.join(__dirname, 'publico')))



// routing
// JSON
var persona = {
    nombre: 'A. Alfonso F. R.',
    edad: 45
}

app.get('/json', function(req, res) {
    res.json(persona)
})

app.get('/mestado/:id', (req, res) => {
    guardaClasifica(req, res)

})

app.listen(3000, function() {
    console.log('escucha 3000')
})

/*
 * Función que guarda la clasificación propuesta 
 */
function guardaClasifica(req, res) {

    var aux = req.params.id.split("_")
    console.log(aux)

    var estatus = '';
    if (aux[0] === 'mdes') {
        estatus = 'despierto'
    } else if (aux[0] === 'mdor') {
        estatus = 'dormido'
    }

    var archivo = PATH_IMG + aux[1] + '.txt'

    fs.writeFile(archivo, estatus, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Archivo escrito en " + archivo)
    });


    res.json(persona)
}