
const palavras = ["javascript", "python", "html", "css", "nodejs", "react", "angular", "programacao", "desenvolvimento", "frontend"];


let palavra = palavras[Math.floor(Math.random() * palavras.length)].toUpperCase(); 
let palavraOculta = "_".repeat(palavra.length); 
let tentativasErradas = 0;
let letrasErradas = [];


const wordDisplay = document.getElementById("wordDisplay");
const wrongGuesses = document.getElementById("wrongGuesses");
const guessInput = document.getElementById("guess");
const message = document.getElementById("message");
const guessButton = document.getElementById("guessButton");
const wrongLetters = document.getElementById("wrongLetters");
const hangmanDrawing = document.getElementById("hangmanDrawing");

// Desenhos da forca
const desenhos = [
    "", // 0 erros - sem desenho
    "O", // 1 erro - cabeça
    "O\n|", // 2 erros - corpo
    "O\n|\\", // 3 erros - braço esquerdo
    "O\n|\\/", // 4 erros - braço direito
    "O\n|\\/\n/", // 5 erros - perna esquerda
    "O\n|\\/\n/\\" // 6 erros - perna direita
];


function atualizarPalavra() {
    wordDisplay.textContent = palavraOculta.split("").join(" ");
}


function atualizarLetrasErradas() {
    wrongLetters.textContent = letrasErradas.length > 0 ? letrasErradas.join(", ") : "-";
}


function atualizarDesenho() {
    hangmanDrawing.textContent = desenhos[tentativasErradas];
}

// Função para resetar o jogo e iniciar uma nova palavra
function reiniciarJogo() {
    // Escolhe uma nova palavra aleatória
    palavra = palavras[Math.floor(Math.random() * palavras.length)].toUpperCase(); 
    palavraOculta = "_".repeat(palavra.length); 
    tentativasErradas = 0;
    letrasErradas = [];

    
    atualizarPalavra();
    wrongGuesses.textContent = tentativasErradas;
    atualizarLetrasErradas();
    atualizarDesenho();
    message.textContent = "";
    guessInput.disabled = false;
    guessButton.disabled = false;

    
    document.getElementById("retryButton").style.display = "none";
    document.getElementById("nextWordButton").style.display = "none";
}


function tentarNovamente() {
    palavraOculta = "_".repeat(palavra.length);
    tentativasErradas = 0;
    letrasErradas = [];

    
    atualizarPalavra();
    wrongGuesses.textContent = tentativasErradas;
    atualizarLetrasErradas();
    atualizarDesenho();
    message.textContent = "";
    guessInput.disabled = false;
    guessButton.disabled = false;

    
    document.getElementById("retryButton").style.display = "none";
    document.getElementById("nextWordButton").style.display = "none";
}


function verificarTentativa(letra) {
    letra = letra.toUpperCase();
    if (letrasErradas.includes(letra) || palavraOculta.includes(letra)) {
        return;
    }

    if (palavra.includes(letra)) {
        
        for (let i = 0; i < palavra.length; i++) {
            if (palavra[i] === letra) {
                palavraOculta = palavraOculta.substring(0, i) + letra + palavraOculta.substring(i + 1);
            }
        }
    } else {
        tentativasErradas++;
        letrasErradas.push(letra); 
    }

    
    wrongGuesses.textContent = tentativasErradas;
    atualizarPalavra();
    atualizarLetrasErradas(); 
    atualizarDesenho(); 

    
    if (tentativasErradas >= 6) {
        message.textContent = "Você perdeu! A palavra era: " + palavra;
        guessInput.disabled = true;
        guessButton.disabled = true;
        
        document.getElementById("retryButton").style.display = "inline-block";
        document.getElementById("nextWordButton").style.display = "inline-block";
    } else if (!palavraOculta.includes("_")) {
        message.textContent = "Parabéns, você acertou a palavra!";
        guessInput.disabled = true;
        guessButton.disabled = true;
        
        document.getElementById("retryButton").style.display = "inline-block";
        document.getElementById("nextWordButton").style.display = "inline-block";
    }
}


document.getElementById("retryButton").addEventListener("click", function() {
    tentarNovamente();
});


document.getElementById("nextWordButton").addEventListener("click", function() {
    reiniciarJogo();
});


guessInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const letra = guessInput.value.trim();
        if (letra) {
            verificarTentativa(letra);
            guessInput.value = ""; 
        }
    }
});


reiniciarJogo();
