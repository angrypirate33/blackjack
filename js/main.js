/*--------------------constants--------------------*/

///////constsants provided by CSS card library///////
const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const NUM_DECKS = 3
const originalDeck = buildOriginalDeck()

///////////////end of provided constants/////////////

const chipSound = new Audio('sounds/chips.mp3')
const cardSound = new Audio('sounds/cardflip.mp3')


/*-------------------------------------------------*/

/*--------------------app state--------------------*/

////////variables provided by CSS card library//////
let shuffledDeck = getNewShuffledDeck()
/////////////end of provided variables/////////////

// variables to store the total score of each hand
let dTotal
let pTotal
let currWager


/*-------------------------------------------------*/

/*----------------cached elements------------------*/

// this chunk of variables cache the buttons and other important elements.
const betButton = document.getElementById('placeBet')
const wagerAmt = document.getElementById('wagerAmt')
const hitBtn = document.getElementById('hitButton')
const standBtn = document.getElementById('standButton')
let bankAmt = document.getElementById('bankrollAmt')
let msgCntr = document.getElementById('messageCenter')

// this chunk of variables cache the location each card will go.
const pOne = document.getElementById('playerOne')
const pTwo = document.getElementById('playerTwo')
const pThree = document.getElementById('playerThree')
const pFour = document.getElementById('playerFour')
const pFive = document.getElementById('playerFive')
const pSix = document.getElementById('playerSix')
const pSeven = document.getElementById('playerSeven')
const dOne = document.getElementById('dealerOne')
const dTwo = document.getElementById('dealerTwo')
const dThree = document.getElementById('dealerThree')
const dFour = document.getElementById('dealerFour')
const dFive = document.getElementById('dealerFive')
const dSix = document.getElementById('dealerSix')
const dSeven = document.getElementById('dealerSeven')
/*-------------------------------------------------*/

/*-----------------event listeners-----------------*/

wagerAmt.addEventListener('change', playChipSound)
betButton.addEventListener('click', storeWager)

/*-------------------------------------------------*/

/*--------------------functions--------------------*/

//////FUNCTIONS PROVIDED BY CSS CARD LIBRARY/////////
function getNewShuffledDeck() {
    const tempDeck = [...originalDeck, ...originalDeck, ...originalDeck]
    const newShuffledDeck = []
    while (tempDeck.length) {
      const rndIdx = Math.floor(Math.random() * tempDeck.length)
      newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0])
    }
    return newShuffledDeck
  }

function buildOriginalDeck() {
    const deck = []
    suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
    deck.push({
        face: `${suit}${rank}`,
        value: Number(rank) || (rank === 'A' ? 11 : 10)
    })
    })
})
return deck;
}

function renderNewShuffledDeck() {
    shuffledDeck = getNewShuffledDeck();
    renderDeckInContainer(shuffledDeck, shuffledContainer);
  }

function renderDeckInContainer(deck, container) {
    container.innerHTML = '';
    let cardsHtml = '';
    deck.forEach(function(card) {
      cardsHtml += `<div class="card ${card.face}"></div>`;
    });
    container.innerHTML = cardsHtml;
  }
//////////////end of provided functions//////////////
init()
// initializes starting game state, cards, bankroll, wager, and score amts.
function init() {
    bankAmt = 1000
    document.querySelector('#bankrollAmt').innerHTML += `${bankAmt}`
    
 }

function playChipSound() {
    chipSound.play()
}

function playCardSound() {
    cardSound.play()
}

function storeWager() {
    clearMsg()
    currWager = wagerAmt.value
    if (currWager < bankAmt) {
    bankAmt = (bankAmt - wagerAmt.value)
    renderBank()
    } else {
        msgCntr.innerHTML = `You do not have enough money to place this bet.  Please
        bet less than $${bankAmt} to proceed.`
    }
}

function calcPlayerTotal() {

}

function renderBank() {
        document.querySelector('#bankrollAmt').innerHTML = ''
        document.querySelector('#bankrollAmt').innerHTML += `Bankroll: $${bankAmt}`
}

function clearMsg() {
    msgCntr.innerHTML = ''
}

function testCard() {
    dOne.className = 'card d09'
    pOne.className = 'card sA'
    dTwo.className = 
    pTwo.className = 'card hK'
}

testCard()

/*-------------------------------------------------*/





