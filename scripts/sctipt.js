const allCards = document.querySelectorAll('.card');

let firstCard, secondCard, hasFlipedCard = false;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  this.classList.add('card_action_flip');
  if(!hasFlipedCard) { 
    hasFlipedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  hasFlipedCard = true;
  checkForMatch();
}

function unflipCard() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('card_action_flip');
    secondCard.classList.remove('card_action_flip');
    resetBoard();
  }, 1500); 
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function checkForMatch() {
  if(firstCard.dataset.id === secondCard.dataset.id) { 
    disableCards();
    return;
  } else {
    console.log('not mached');
    unflipCard();
  }
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  [lockBoard, hasFlipedCard] = [false, false];
}

allCards.forEach((card) => {
  card.addEventListener('click', flipCard);
});