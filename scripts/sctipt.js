const sectionCards = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;
let firstCard, secondCard, hasFlipedCard = false;
let lockBoard = false;

const initCards = [
  {
    id: 1, 
    name: 1
  }, 
  {
    id: 2,
    name: 2
  },
  {
    id: 3,
    name: 3
  },
  {
    id: 4,
    name: 4
  },  
  {
    id: 5,
    name: 5
  },
  {
    id: 'test',
    name: 'no-name'
  }
];

initCards.forEach(card => initCards.push(card));



console.log(sectionCards);

function renderCards(initCards) {
  const listItems = initCards.map(createCard);
  sectionCards.append(...listItems);
}

function createCard(data) {
  const card = cardTemplate.cloneNode(true);
  const cardWrap = card.querySelector('.card');
  const cardFront = card.querySelector('.card__front-face');
  cardWrap.setAttribute('data-id', data.id);
  cardFront.textContent = data.name;
  return card;
}

renderCards(initCards);

const allCards = document.querySelectorAll('.card');

function flipCard() {
  if (lockBoard) return;
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

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  [lockBoard, hasFlipedCard] = [false, false];
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