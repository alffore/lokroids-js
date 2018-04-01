const main = document.querySelector('main')

window.addEventListener('load', async e => {
  actualizaLista()
})

async function actualizaLista () {
  const res = await fetch(`//127.0.0.1:3000/imagenes/fotos.json`)
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

  if (entrada.clasificado === 'despierto') {
    marcades = 'checked'
  }

  if (entrada.clasificado === 'dormido') {
    marcador = 'checked'
  }

  return `<div class="article">
          <div class="foto_id">${entrada.id}</div>
          <div class="imagen_foto"><img src="${entrada.imagen_url}" width="240"></div>
            <div class="clasificacion">
            <input type="radio" value="despierto" name="estado${entrada.id}" class="mdes" id="mdes_${entrada.id}" ${marcades}> despierto
            <input type="radio" value="dormido" name="estado${entrada.id}" class="mdor" id="mdor_${entrada.id}" ${marcador}> dormido
            </div>
          </div>`
}

function marcaEstado (objEstado) {
  fetch(`//127.0.0.1:3000/mestado/${objEstado.id}`)
}
