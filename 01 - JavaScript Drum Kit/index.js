/*
  Novas:
  - keycode.info para achar as keycode das teclas
  - data-<attribute>: serve para vc criar seu próprio atributo no html
  - <Element>.currentTime: atributo que guarda o tempo que a div foi usada
  - querySelector(.<classe>): é preciso do ponto antes para referenciar uma classe
  - transform é um atributo de um Element
      scale, rotate, skewY, scaleY são exemplos de transforms
  - <Element>.propertyName: atributo que guarda o nome do evento
  - this: em uma função chamado por um evento, referencia o objeto adicionado o AddEventListener

  MyScript
  1. adiciona uma espera de evento para o teclado "keydown"
  2. adiciona a classe playing playing à div correspondente à tecla
  3. e toca o som
*/

window.addEventListener('keydown', playSound)
function playSound(e){

    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    if(!audio)return;
    audio.currentTime = 0 // zera o tempo do áudio e permite tocar de nova
    audio.play();
    key.classList.add("playing") // aqui, não precisa do . para se referenciar a classe


    function removeTransition(e){
        if(e.propertyName != 'transform') return; // garante que está pegando apenas o evento de transform
        //console.log(this) // this referencia ao objeto que gerou evento recebido
        this.classList.remove('playing')
    }

    const keys = document.querySelectorAll(".key")
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));

}