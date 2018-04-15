/**
 * Código para mover archivos de imagenes sin clasificar a imagenes para entrenar o clasificadas
 */
var path = require('path')
var fs = require('fs')

var PATH_IMG = path.join(__dirname, 'publico/imagenes/')
var PATH_IMGC = path.join(__dirname, 'publico/imagenes_clas/')

fs.readdir(PATH_IMG, (err, files) => {
  if (err) {
    console.log(err)
    return
  }

  files.forEach(element => {
    var ae = element.split('.')

    if (ae[1] == 'json') {
      mueveArchivo(element)
    }
  })
})

/**
 *
 * @param {string} archivo
 */
function mueveArchivo (archivo) {
  var obj
  var ae = archivo.split('.')

  fs.readFile(`${PATH_IMG}${archivo}`, 'utf8', (err, data) => {
    if (err) throw err
    obj = JSON.parse(data)
    if (obj.clasificado.length > 0) {
      
      fs.rename(`${PATH_IMG}${archivo}`, `${PATH_IMGC}${obj.clasificado}/${archivo}`, (err) => {
        if (err) throw err
        console.log(`${PATH_IMG}${archivo} => ${PATH_IMGC}${obj.clasificado}/${archivo}`)
      })
      fs.rename(`${PATH_IMG}${ae[0]}.jpg`, `${PATH_IMGC}${obj.clasificado}/${ae[0]}.jpg`, (err) => {
        if (err) throw err
        console.log(`${PATH_IMG}${ae[0]}.jpg => ${PATH_IMGC}${obj.clasificado}/${ae[0]}.jpg`)
      })
    }
  })
}
