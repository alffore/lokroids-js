var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')

var miip = require('./miip')
guardaIP()

var app = express()

var PATH_PUB = path.join(__dirname, 'publico/')
var PATH_IMG = path.join(__dirname, 'publico/imagenes/')
var PATH_URL = `//${miip()}:3000/`

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// recursos estaticos
app.use(express.static(path.join(__dirname, 'publico')))

app.get('/json', function (req, res) {
  leeCreaJSON(req, res)
})

app.get('/mestado/:id', (req, res) => {
  guardaClasifica(req, res)
})

app.listen(3000, function () {
  console.log('escucha 3000')
})

/**
 * Función que guarda la clasificación propuesta
 * @param {*} req
 * @param {*} res
 */
function guardaClasifica (req, res) {
  var aux = req.params.id.split('_')
  console.log(aux)

  var estatus = ''
  if (aux[0] === 'mdes') {
    estatus = 'despierto'
  } else if (aux[0] === 'mdor') {
    estatus = 'dormido'
  }

  var archivo = PATH_IMG + aux[1] + '.json'

  var auxjson = {
    imagen_url: `${PATH_URL}imagenes/${aux[1]}.jpg`,
    clasificado: `${estatus}`,
    nimg: `${aux[1]}`,
    id: Number(aux[2]),
    ch: 1
  }

  fs.writeFile(archivo, JSON.stringify(auxjson), function (err) {
    if (err) {
      return console.log(err)
    }
  })

  res.json(auxjson)
}

/**
 * Función que crea el JSON de images a clasificar para entrenamiento
 */
function leeCreaJSON (req, res) {
  var aImg = { entradas: [] }

  fs.readdir(PATH_IMG, function (err, files) {
    if (err) {
      res.json(aImg)
    }
    files.forEach(element => {
      var ae = element.split('.')
      if (ae[1] === 'json') {
        console.log(`JSON: ${PATH_IMG}${element}`)
        var aux = JSON.parse(fs.readFileSync(`${PATH_IMG}${element}`, 'utf8'))
        aImg.entradas.push(aux)
      }
    })

    res.json(aImg)
  })
}

/**
 * Función que guarda la IP para el consumo de diversas partes de la app
 */
function guardaIP () {
  var auxjson = {'ip': `${miip()}`}

  var archivo =  '/mnt/lokros/ipdir.json'

  fs.writeFile(archivo, JSON.stringify(auxjson), err => {
    if (err) {
      return console.log(err)
    }
  })
}
