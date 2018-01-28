const welcome = document.getElementById('great')
const content = document.getElementById('content')
function start(){
	welcome.className = 'visible'
	content.className = ''
	newWordRound()
}
function getElementByKeyCode(keyCode){
  return document.querySelector(`[data-key="${keyCode}"]`)
}
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
function deactivate(el){
  el.className = 'key';
}
function giveWord(){
	let rand = Math.round(Math.random() * words.length - 1)
	return words[rand]
}

const words = getDictionary()
const wordRow = document.getElementById('word')
const counter = document.getElementById('count')
let countWords = 1;

function newWordRound(){
	let i = 0
	let setWord = giveWord()
	wordRow.textContent = setWord
	window.addEventListener('keydown', checkChars)
	
	function checkChars(e){

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
			        counter.textContent = countWords
			         newWordRound()	
			        } else{
			          swal("Adios..! <3")
			          welcome.className = ''
					 content.className = 'visible'
			        }
		   		})
		}
		if(setWord.length == i){
			window.removeEventListener('keydown', checkChars)
			swal({text: 'Correcto!', timer: 800, button: false, icon: 'success'})
	    	counter.textContent = countWords++
	    	newWordRound()

		}
		
	}
}

