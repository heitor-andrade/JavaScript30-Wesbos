/* 
NOVAS:
    - video[<function>](): chama o método do elemento "video" que tem o mesmo nome de <function>
        function é uma string 
    - <video></video>: suporta um formato de vídeo
        possui os métodos play e pause
        atributos: paused, currentTime, duration
    - [data-skip]: procura por todas as tags com o atributo data-skip
        o acesso ao valor do atributo skip é feito por elemento.dataset.skip
    - parseFloat: built-in para converter float para string
    - e.offsetX : é a distância no eixo x relativo a origem da do elemento
    - div.offsetWidth: atributo que referencia à largura da div
    - <boolean> && <function>: executa a função apenas se boolean for true
    
*/

// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// build our functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]()
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚'
    toggle.innerHTML = icon
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    console.log(percent)
    progressBar.style.flexBasis =   `${percent}%`
}

function scrub(e) {
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration
}

// hook up the event listeners
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)


toggle.addEventListener('click', togglePlay)
skipButtons.forEach(skipButton => {
    skipButton.addEventListener('click', skip)
})
ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate)
})
ranges.forEach(range => {
    range.addEventListener('mousemove', handleRangeUpdate)
})

let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
