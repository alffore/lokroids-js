
const urlBase =`//${document.location.host}/`

//const main = document.querySelector('main')

const dsincla = document.querySelector("#dsincla")
const ddormido = document.querySelector("#ddormido")
const ddespierto = document.querySelector("#ddespierto")
const dotro = document.querySelector("#dotro")

console.log(dsincla)

window.addEventListener('load', async e => {
  actualizaLista()
})

async function actualizaLista () {
    
  const res = await fetch(`${urlBase}json`)
  const json = await res.json()



  json.entradas.map(creaEntrada2)


  const obmdes = document.querySelectorAll('.mdes')
  const obmdor = document.querySelectorAll('.mdor')
  const obmotr = document.querySelectorAll('.motr')

  for (var i = 0; i < obmdes.length; i++) {
    obmdes[i].onclick = function () {
      marcaEstado(this)
    }

    obmdor[i].onclick = function () {
      marcaEstado(this)
    }

    obmotr[i].onclick = function () {
      marcaEstado(this)
    }

  }
}



function marcaEstado (objEstado) {
  fetch(`${urlBase}mestado/${objEstado.id}`)
}


function creaEntrada2(entrada){
  
  var marcades = ''
  var marcador = ''
  var marcaotr = ''

  var obpon = dsincla

  var estilobloque = 'article'

  if (entrada.clasificado === 'despierto') {
    marcades = 'checked'
    estilobloque = 'article_des'
    obpon = ddespierto
  }

  if (entrada.clasificado === 'dormido') {
    marcador = 'checked'
    estilobloque = 'article_dor'
    obpon = ddormido
  }

  if (entrada.clasificado === 'otro') {
    marcaotr = 'checked'
    obpon = dotro
  }

  var cadena=`<div class="${estilobloque}">
          <div class="foto_id">id: ${entrada.id}</div>
          <div class="imagen_foto"><img src="imagenes/${entrada.imagen_url}" width="240"></div>
            <div class="clasificacion">
            <input type="radio" value="despierto" name="estado${entrada.id}" class="mdes" id="mdes_${entrada.nimg}_${entrada.id}" ${marcades}> despierto
            <input type="radio" value="dormido" name="estado${entrada.id}" class="mdor" id="mdor_${entrada.nimg}_${entrada.id}" ${marcador}> dormido
            <input type="radio" value="otro" name="estado${entrada.id}" class="motr" id="motr_${entrada.nimg}_${entrada.id}" ${marcaotr}> otro            
            </div>
          </div>`

  if (typeof obpon.innerHTML === 'undefined' || obpon.innerHTML.length === 0){
    obpon.innerHTML = cadena
  }else{
    obpon.innerHTML = obpon.innerHTML + cadena
  }

	
  console.log("Objeto div: "+obpon.id)
}
