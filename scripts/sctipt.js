const sectionCards = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;
let firstCard, secondCard, hasFlipedCard = false;
let lockBoard = false;
let clickCounter = 0;

const initCards = [
  {
    id: 1, 
    image: './images/tortule.png'
  }, 
  {
    id: 2,
    image: './images/skuns.png'
  },
  {
    id: 3,
    image: './images/pig.png'
  },
  {
    id: 4,
    image: './images/wild-pig.png'
  },  
  {
    id: 5,
    image: './images/dog.png'
  },
  {
    id: 6,
    image: './images/mouse.png'
  },
  // {
  //   id: 7,
  //   image: './images/elephant.png'
  // },
  // {
  //   id: 8,
  //   image: './images/monkey.png'
  // },
  // {
  //   id: 9,
  //   image: './images/ass.png'
  // },
];


initCards.forEach(card => initCards.push(card));


function renderCards() {
  const listItems = initCards.map(createCard);
  sectionCards.append(...listItems);
}

function createCard(data) {
  const card = cardTemplate.cloneNode(true);
  const cardWrap = card.querySelector('.card');
  const cardFront = card.querySelector('.card__front-face');
  const cardBack = card.querySelector('.card__back-face');
  cardWrap.setAttribute('data-id', data.id);
  cardFront.setAttribute('src', data.image);
  cardBack.setAttribute('src', './images/card-front-face.jpg');
  return card;
}

renderCards(initCards);

const allCards = document.querySelectorAll('.card');

function flipCard() {
  if (lockBoard) return;
  clickCounter++;
  if (this === firstCard) return;
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
  console.log('Fliped: ' + countFlipedCards() + '; clicked - ' + clickCounter + ' times.');
  checkForWin();
  resetBoard();
}

function checkForMatch() {
  if(firstCard.dataset.id === secondCard.dataset.id) { 
    disableCards();
    return;
  } else {
    unflipCard();
  }
}

function countFlipedCards() {
  const flipedCards = document.querySelectorAll('.card');
  let flipedCardsCounter = 0;
  flipedCards.forEach((card) => {
    if(card.classList.contains('card_action_flip')) {
      flipedCardsCounter++;
    }
  });
  return flipedCardsCounter;
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  [lockBoard, hasFlipedCard] = [false, false];
}

function showResult() {
  const popup = document.querySelector('.popup');
  const numClicked = popup.querySelector('.result__clicked-times');
  const numCards = popup.querySelector('.result__opened-cards');
  numClicked.textContent = clickCounter;
  numCards.textContent = countFlipedCards();
  popup.style.display = 'flex';
}

function checkForWin() {
  if(countFlipedCards() == initCards.length) {
    showResult();
  }
}

(function shuffle() {
  allCards.forEach(card => {
    let randomPos = Math.floor(Math.random() * allCards.length);
    card.style.order = randomPos;
  });
})();

console.log(allCards.length);

allCards.forEach((card) => {
  card.addEventListener('click', flipCard);
});