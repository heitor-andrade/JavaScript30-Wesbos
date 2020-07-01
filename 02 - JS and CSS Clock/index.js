/* 
    Novas
        - tranform: rotate(20deg)
        - transform-origin: 100%; :
            mexe com o eixo de rotação no eixo x
            normalmente o ponto de rotação é o meio, jogando em 100% vai para a extrema direita
        - transition-timing-function: <opçõe>: dá pra ver as opções no chrome e mexer com ela, é bonzão
        - <element>.style: acessa os atributos de estilização do elemento
            pode ser usado com <element>.style.transform = "rotate(90deg)"
        - new <construtor>(<argumentos>): cria um objeto da instância do construtor
            o construtor pode ser um objeto construido no script ou uma função built-in do JS
            
    Script
    - pegar date
    - rotacionar

*/
const secondHand = document.querySelector('.second-hand')
const minHand = document.querySelector('.min-hand')
const hourHand = document.querySelector('.hour-hand')
let counter = 0 // counter para incrementar os graus em 360 a cada minuto

function setDate(){
    const now = new Date(); // o que é esse new
    const seconds = now.getSeconds();
    console.log(seconds)
    const secondsDegrees = (seconds * 6 + 90) + 360 * counter
    console.log(secondsDegrees)
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`
    if (seconds == 59)  counter++
    
    const minutes = now.getMinutes()
    const minutesDegrees = minutes * 6 + 90
    minHand.style.transform = `rotate(${minutesDegrees}deg)`

    const hours = now.getHours()
    const hoursDegrees = hours/12 * 360 + 90
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`

}

setInterval(setDate, 1000)
