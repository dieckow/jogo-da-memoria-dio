const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let fisrtCard, secondCard;
let lockBoard = false;

//----- Função para virar a carta -----------------------------------
function flipCard() {

    if(lockBoard) return;

    if(this === fisrtCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        fisrtCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//----- função para checar se as cartas são iguais ------------------
function checkForMatch() {
    if(fisrtCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return;
    }

    unflipCards();
}

//----- função para desabilitar as cartas ---------------------------
function disableCards() {
    fisrtCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//----- função para desvirar as cartas ------------------------------
function unflipCards(){
    lockBoard = true;

    setTimeout(()=> {
        fisrtCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//----- função para resetar o tabuleiro -----------------------------
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [fisrtCard, secondCard] = [null, null];
}

//----- função para definir a ordem das cartas ----------------------
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

//----- função que adiciona o evento click na carta -----------------
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})
