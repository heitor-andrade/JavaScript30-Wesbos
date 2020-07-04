/* 
    NOVAS
    - e.propertyName.includes(<name>): verifica um evento em específico
    - * : é um css selector que seleciona todos os elementos
    - father > some-children: é um css selector que seleciona todos os some-children
    - <elemento>:first/last-child: css selector que referencia apenas o primeiro/último <elemento>
    */

const panels = document.querySelectorAll('.panel');

function toggleOpen() {
    this.classList.toggle('open')
}

function toggleActive(e){
    if (e.propertyName.includes("flex")) {
        this.classList.toggle('open-active')
    } 
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen))
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive))
