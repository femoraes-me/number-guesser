/* FUNÇÕES PARA FUNCIONAMENTO DO JOGO

- o jogador deve adivinhar um número entre o mínimo e o máximo
- jogador recebe uma certa quantidade de palpites
- notificar o jogador sobre os palpites restantes
- notificar o jogador da resposta correta se perder
- deixar o jogador escolher jogar novamente */

// Valores para o game
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

let winColor = 'green',
    loseColor = 'red';

// Elementos de Interface
const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessInput = document.getElementById('guess-input'),
    guessBtn = document.getElementById('guess-btn'),
    message = document.querySelector('.message');

// colocando min e max na interface
minNum.textContent = min;
maxNum.textContent = max;

// evento para jogar novamente
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

// verificando palpites
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // validando se número inserido é um número válido
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Por favor, digite um número entre ${min} e ${max}`, 'DarkOrange');
    } else {
        // verificando se numero está correto
        if(guess === winningNum){
        
            gameOver(true, `${winningNum} é o número correto, VOCÊ VENCEU!!!`);

        } else {
            
            guessesLeft -= 1; // diminuindo o numero de tentativas

            if(guessesLeft === 0) {
                
                // fim de jogo - perdeu
                guessInput.disabled = true;
                guessInput.style.borderColor = loseColor;
                gameOver(false, `FIM DE JOGO! ${winningNum} é o número correto, VOCÊ PERDEU!!!`);
            
            } else {
                
                // tentar novamente
                guessInput.style.borderColor = loseColor;
                guessInput.value = '';
                setMessage(`${guess} não é o número correto, tente novamente. ${guessesLeft} tentativas restantes.`, loseColor);   
            }
        }
    }

    
});

// função para pegar o número aleatório
function getRandomNum(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min)
}

// função para exibir mensagem
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// função para o final do jogo
function gameOver(won, msg) {
    let color;
    won === true ? color = winColor : color = loseColor;
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(msg, color);

    // jogar novamente 
    guessBtn.value = 'jogar novamente';
    guessBtn.className += 'play-again';
}



