/* 
    NOVAS
    - <input type="range" min= <min> max=<max>/>: é aquele estilo alavanca que atua em um range
    - <input type="color" />: input específico para selecionar cores em rgb
    - <element>.addEventListener('mousemove', <function>) : mousemove serve como gatilho para função toda vez que clica naquele elemento e move o mouse
    - this.dataset: é um atributo/objeto
        que guarda todos os atributos criados naquele elemento com o prefixo "data-"
    - +poop : faz um emoji de coco, estando no atributo de uma div 
    - const suffix = this.dataset.sizing || ''; : 
        se antes de || for null, a variável recebe o que tem depois de ||
    - document.documentElement.style.setProperty(<variable_name>, value): modifica o valor da variável dentro de :root nos style
    
    */

const inputs = document.querySelectorAll("input")

function handleUpdate(){
    const suffix = this.dataset.sizing || '';+
    console.log(`--${this.name}`, this.value + suffix)
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
    

}

inputs.forEach(input => input.addEventListener('mousemove', handleUpdate))
inputs.forEach(input => input.addEventListener('change', handleUpdate))
