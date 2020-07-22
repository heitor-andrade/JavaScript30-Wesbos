/* 
NOVAS:
    - navigator.mediaDevices.getUserMedia({video: true, audio:false}): é uma promessa que retorna um objeto localMediaStream
    - <video>.srcObject = localMediaStream: pega o objeto retornado pela getUserMedia, e coloca numa tag html video para aparecer
        video.play(): faz com que o vídeo em .srcObject rode
    - ctx.drawImage(<video>, 0, 0, width, height): pega a imagem do video e coloca no ctx
        ctx é o retorno do canvas.getContext('2d')
    - ctx.getImageData(0, 0, width, height): retorna os píxels em um objeto
        objeto.data contém um array com o valor de todos os píxel
        [r, g, b, a, r, g, b...]
    - <a download="<nome>"> permite fazer o download do que estiver no link
    - strip.insertBefore(<newElement>, <refElement>): põe o newElemente logo antes do refElement
    - video.addEventListener('canplay'): quando o vídeo possuir algo para rodar, ele manda um evento canplay

*/

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err =>{
            console.error('OH NOO!! ', err)
        })
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval( () => {
        ctx.drawImage(video, 0, 0, width, height);
        
        // pega os pixels
        let pixels = ctx.getImageData(0, 0, width, height);

        // mess with them
        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);
        ctx.globalAlpha = 0.1;        
        // put them back
        ctx.putImageData(pixels, 0, 0);


    }, 16);
}

function takePhoto() {
    // played the sound
    snap.currentTime = 0;
    snap.play();

    // take the data out of canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data} alt="Handsome Man" />`;
    strip.insertBefore(link, strip.childNodes[0]);
}   

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i] = pixels.data[i] + 100// r
        pixels.data[i + 1] = pixels.data[i+1] - 100// g
        pixels.data[i + 2] = pixels.data[i+2] / 2 // b
    }
    return pixels;
}

function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i - 150] = pixels.data[i+ 0]  // r
        pixels.data[i + 500] = pixels.data[i + 1] // g
        pixels.data[i - 500] = pixels.data[i + 2] // b
    }
    return pixels;
}

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i] = pixels.data[i] + 100// r
        pixels.data[i + 1] = pixels.data[i+1] - 100// g
        pixels.data[i + 2] = pixels.data[i+2] / 2 // b
    }
    return pixels;
}

getVideo()

video.addEventListener('canplay', paintToCanvas)