//Elementos desde el DOM
const welcome = document.getElementById('great') //Contenido inicial
const content = document.getElementById('content') // Keyboard
const spnivel = document.getElementById('nivel') // span de nivel
const wordRow = document.getElementById('word') // p de la palabra
const counter = document.getElementById('count') // Contador de palabras
const words = getDictionary() //Imporado el diccionario desde el html

let countWords = 1
let rand = 0
let before = 0
let level = 0
let niveles = 6 //Es importante este nivel ya que depende del # de caracteres

/*
	Inicializa el juego y muestra y oculta el saludo y el keyboard
	@var go //True or False para emepezar o terminar
	@var set & val //Recibe valor de 'visible' o ''
*/
function start(go, set, val){
		welcome.className = set
		content.className = val
	if (go) newWordRound()
}

/*
	Selecciona el keyCode de un objeto del DOM
	@var keyCode //Numero de tecla 65 - 90
*/
function getElementByKeyCode(keyCode){
  return document.querySelector(`[data-key="${keyCode}"]`)
}
/*
	Efecto de animacion al presionar una tecla
	@var keyCode //Numero de tecla 65 - 90
	@object recibe 2 valores de success o fail en solo true
*/
function activate(keyCode, opts = {}){
	if (keyCode >= 65 && keyCode <= 90) {

	  const el = getElementByKeyCode(keyCode)
	  el.classList.add('active')
	  if(opts.success)
	    el.classList.add('success')
	  else if(opts.fail)
	    el.classList.add('fail')

	  setTimeout(() => {deactivate(el)} ,500)
	}
}
/*
	Resetea el estilo original del objeto del dom
	@var el //Objeto del dom
*/
function deactivate(el){
  el.className = 'key';
}
/*
	Retorna una palabra del diccionario aleatoriamente de acuerdo al nivel
	@var level //Objeto del dom
*/
function giveWord(level){
	before = rand
	do{	
		rand = Math.round(Math.random() * (words.length - 1))
	}while(!(words[rand].length == level) || !words[rand] || before == rand)

	return words[rand]
}
/*
	Funcion principal o motor del juego gestiona todos los procesos
	Imprime alertas y cambia todo el contenido del DOM ademas de 
	hacer funcionar a las demas funciones por medio de un evento keydown
*/
function newWordRound(){
	
	if(countWords % 5 == 0 && countWords != 0){
		level++
		spnivel.textContent = level
		swal({title: `Nivel: ${level}`, timer: 1000, button: false})
	}

	if(level == niveles){
		swal({title: `Ganaste...! Nivel: ${level}`,text:'Has terminado con este diccionario <3', icon:'success'})
	}

	let i = 0		
	let setWord = giveWord(level + 2)

	wordRow.textContent = setWord
	window.addEventListener('keydown', checkChars)
	
	function checkChars(e){

		if (e.keyCode != 13) {
			if(e.key.toLowerCase() == setWord[i]){
				activate(e.keyCode, {success:true})
				i++
			}
			else{	
				activate(e.keyCode, {fail:true})
				window.removeEventListener('keydown', checkChars)
				swal("Perdiste :(", "Deseas jugar de nuevo?","warning", {buttons: true}).then((ok) => {
			        if (ok) {
			        countWords = 0
			        level = 0
			        spnivel.textContent = level
			        counter.textContent = countWords
			         newWordRound()	
			        } else{
			          swal("Adios..! <3")
			          start(false, '', 'visible')
			        }
		   		})
			}
			if(setWord.length == i){
				window.removeEventListener('keydown', checkChars)

		    	counter.textContent = countWords++
		    	newWordRound()

			}
		}
		
	}
}

