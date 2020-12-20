let order = [] //ordem aleatória que acende os botões e se acumula a cada rodada
let clickedOrder = [] //guarda a cordem que o usuário clicou
let score = 0 //Armazena a pontuação
let entrar = 0 //se entrar na condição de game over


//verde > 0
//vermelho > 1
//amarelo > 2
//azul > 3

/*selecionando as divisões das cores*/

const blue = document.querySelector('div.blue')
const yellow = document.querySelector('div.yellow')
const red = document.querySelector('div.red')
const green = document.querySelector('div.green')

//pegando as divs dos paineis de controle

let rodada = document.querySelector('.rodada')
let scoreNaTela = document.querySelector('.score')

//Cria ordem aleatória de cores

let shuffleOrder = () => {

    let colorOrder = Math.floor(Math.random() * 4) // Sorteia um número de 0 a 3
    order.push(colorOrder)
    clickedOrder = []
    rodada.innerText = order.length
    for(i in order){ //Vai acender os botões para serem clicados

        let elementColor = createColorElement(order[i])
        lightColor(elementColor, Number(i) + 1)

    }


}

//Acende a próxima cor

let lightColor = (element, numero) => {

    numero *= 1000
    setTimeout(() => {
        element.classList.add('selected')
    }, numero - 250)

    setTimeout(() => {
        element.classList.remove('selected')
    }, numero + 250)

}

//vericica se os botões clicados foram os mesmos que acenderam

let checkOrder = () => {

    for(i in clickedOrder){
        

        if(clickedOrder[i] != order[i]){
            if(order.length == 1){
                score = 0
            }
            entrar = 1
            gameOver()

            break
            
        }
       
    }

    if(clickedOrder.length == order.length && entrar == 0){

        nextLevel()
    }
    
    
    
}

//Função para o clique do usuário

let click = (color) => {

    clickedOrder.push(color)
    createColorElement(color).classList.add('selected')

    setTimeout(() => {
        createColorElement(color).classList.remove('selected')
        checkOrder()
    }, 250)

    
}

//Função que retorna a cor

let createColorElement = (color) => {

    if(color == 0){

        return green

    }else if(color == 1){

        return red

    }else if(color == 2){

        return yellow

    }else if(color == 3){

        return blue

    }

}

//Função para o próximo nível

let nextLevel = () => {

        
        score++
        scoreNaTela.innerText = score
        alert(`Te redirecionando para a ${order.length + 1}ª rodada`)
        shuffleOrder()
            
        

}

//Função de Game Over

let gameOver = () => {

    order = []
    clickedOrder = []
    alert(`O seu score foi de ${score} pontos.`)
    score = 0
    window.open('./game-over.html','_self')

    
}

//Iniciar o jogo

let playGame = () => {

    shuffleOrder()

}

//evento de clique para selecionar a cor

green.onclick = () => click(0)
red.onclick = () => click(1)
yellow.onclick = () => click(2)
blue.onclick = () => click(3)

playGame()

