const urlBase = '//192.168.1.70:3000/'
const main = document.querySelector('main')

window.addEventListener('load', async e => {
  actualizaLista()
})

async function actualizaLista () {
    // const res = await fetch(`${url_base}imagenes/fotos.json`)
  const res = await fetch(`${urlBase}json`)
  const json = await res.json()

  main.innerHTML = json.entradas.map(creaEntrada).join('\n')

  const obmdes = document.querySelectorAll('.mdes')
  const obmdor = document.querySelectorAll('.mdor')

  for (var i = 0; i < obmdes.length; i++) {
    obmdes[i].onclick = function () {
      marcaEstado(this)
    }

    obmdor[i].onclick = function () {
      marcaEstado(this)
    }
  }
}

function creaEntrada (entrada) {
  var marcades = ''
  var marcador = ''

  var estilobloque = 'article'

  if (entrada.clasificado === 'despierto') {
    marcades = 'checked'
    estilobloque = 'article_des'
  }

  if (entrada.clasificado === 'dormido') {
    marcador = 'checked'
    estilobloque = 'article_dor'
  }

  return `<div class="${estilobloque}">
          <div class="foto_id">id: ${entrada.id}</div>
          <div class="imagen_foto"><img src="${entrada.imagen_url}" width="240"></div>
            <div class="clasificacion">
            <input type="radio" value="despierto" name="estado${entrada.id}" class="mdes" id="mdes_${entrada.nimg}_${entrada.id}" ${marcades}> despierto
            <input type="radio" value="dormido" name="estado${entrada.id}" class="mdor" id="mdor_${entrada.nimg}_${entrada.id}" ${marcador}> dormido
            </div>
          </div>`
}

function marcaEstado (objEstado) {
  fetch(`${urlBase}mestado/${objEstado.id}`)
}
