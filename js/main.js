/*--------------------constants--------------------*/

///////constsants provided by CSS card library///////
const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const NUM_DECKS = 3 // this constant was not provided by the library
// but I needed it to be above buildOriginalDeck().
const originalDeck = buildOriginalDeck()
///////////////end of provided constants/////////////


const chipSound = new Audio('sounds/chips.mp3')
const cardSound = new Audio('sounds/cardflip.mp3')
const BUST_SCORE = 22

/*-------------------------------------------------*/

/*--------------------app state--------------------*/

////////variables provided by CSS card library//////
let shuffledDeck = getNewShuffledDeck()
/////////////end of provided variables/////////////

// variables to store the total score of each hand
let dTotal
let pTotal
let currWager
let turn
let winner
let playerHand 
let dealerHand 

/*-------------------------------------------------*/

/*----------------cached elements------------------*/

// this chunk of variables cache the buttons and other important elements.
const betButton = document.getElementById('placeBet')
const wagerAmt = document.getElementById('wagerAmt')
const hitBtn = document.getElementById('hitButton')
const standBtn = document.getElementById('standButton')
let bankAmt = document.getElementById('bankrollAmt')
let msgCntr = document.getElementById('messageCenter')
let playerScore = document.getElementById('playerScoreValue')
let dealerScore = document.getElementById('dealerScoreValue')

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
betButton.addEventListener('click', storeAndDeal)

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
    turn = 'p'
    playerHand = []
    dealerHand = []
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
    if (currWager <= bankAmt) {
    bankAmt = (bankAmt - wagerAmt.value)
    renderBank()
    } else {
        msgCntr.innerHTML = `You do not have enough money to place this bet.  Please
        bet less than $${bankAmt} to proceed.`
    }
}

// this function deals the first round of four cards in the correct positions.
// It puts a one second delay between each card being dealt.
// It plays the dealCard sound effect on the same delay.
// It adds the value of the cards to each player's score.
// It makes sure the dealers first card is face down.
function dealFirstRound() {
    setTimeout(() => pOne.className = `card ${shuffledDeck[0].face}`, 1000)
    setTimeout(() => shuffledDeck.shift(), 1000)
    setTimeout(() => cardSound.play(), 1000)
    setTimeout(() => pTotal = shuffledDeck[0].value, 1001)
    setTimeout(() => dOne.className = `card ${shuffledDeck[0].face} back`, 2000)
    setTimeout(() => shuffledDeck.shift(), 2000)
    setTimeout(() => cardSound.play(), 2000)
    // setTimeout(() => dTotal = shuffledDeck[1].value, 2001)
    setTimeout(() => pTwo.className = `card ${shuffledDeck[0].face}`, 3000)
    setTimeout(() => shuffledDeck.shift(), 3000)
    setTimeout(() => cardSound.play(), 3000)
    setTimeout(() => pTotal += shuffledDeck[2].value, 3001)
    setTimeout(renderPlayerScore, 3002)
    setTimeout(() => dTwo.className = `card ${shuffledDeck[0].face}`, 4000)
    setTimeout(() => shuffledDeck.shift(), 4000)
    setTimeout(() => cardSound.play(), 4000)
    setTimeout(() => dTotal = shuffledDeck[3].value, 4001)
    setTimeout(renderDealerScore, 4002)
}

function storeAndDeal() {
    clearTable()
    storeWager()
    dealFirstRound()
}

function playerHit() {

}

function playerStand() {

}

function calcPlayerTotal() {

}

function renderBank() {
    document.querySelector('#bankrollAmt').innerHTML = ''
    document.querySelector('#bankrollAmt').innerHTML += `Bankroll: $${bankAmt}`
}

function renderDealerScore() {
    dealerScore.innerHTML = `${dTotal}`
}

function renderPlayerScore() {
    playerScore.innerHTML = `${pTotal}`
} 

function clearTable() {
    dOne.className = 'dealerCard'
    dTwo.className = 'dealerCard'
    dThree.className = 'dealerCard'
    dFour.className = 'dealerCard'
    dFive.className = 'dealerCard'
    dSix.className = 'dealerCard'
    dSeven.className = 'dealerCard'
    dealerScore.innerHTML = ''
    pOne.className = 'playerCard'
    pTwo.className = 'playerCard'
    pThree.className = 'playerCard'
    pFour.className = 'playerCard'
    pFive.className = 'playerCard'
    pSix.className = 'playerCard'
    pSeven.className = 'playerCard'
    playerScore.innerHTML = ''
}

function clearMsg() {
    msgCntr.innerHTML = ''
}

/*-------------------------------------------------*/





