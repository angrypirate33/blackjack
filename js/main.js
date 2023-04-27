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
let dHidden
let pTotal
let currWager
let turn
let winner
let isBusted = 'false'

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

// this even listener only allows players to start
// a hand by clicking the place bet button if their
// bet is above the table minimum.
betButton.addEventListener('click', () => {
    currWager = wagerAmt.value
    if (currWager <= bankAmt && currWager > 0) {
    storeAndDeal()
} else if (currWager < 10 || currWager === '') {
    msgCntr.innerHTML = `Please wager at least the minimum bet of $10 to play a hand.`
}else {
    msgCntr.innerHTML = `You do not have enough money to place this bet.  Please
    bet less than $${bankAmt} to proceed.`
}
})

hitBtn.addEventListener('click', playerHit)

standBtn.addEventListener('click', playerStand)

/*-------------------------------------------------*/

/*--------------------functions--------------------*/

//////functions provided by css card library replit/////////
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
    } 
}

// this function deals the first round of four cards in the correct positions.
// It puts a one second delay between each card being dealt.
// It plays the dealCard sound effect on the same delay.
// It adds the value of the cards to each player's score.
// It makes sure the dealers first card is face down.
function dealFirstRound() {
    setTimeout(() => pOne.className = `card ${shuffledDeck[0].face}`, 1000)
    setTimeout(() => pTotal = shuffledDeck[0].value, 1001)
    setTimeout(() => shuffledDeck.shift(), 1002)
    setTimeout(() => cardSound.play(), 1000)
    setTimeout(() => dOne.className = `card ${shuffledDeck[0].face} back`, 2000)
    setTimeout(() => dHidden = shuffledDeck[0].value, 2001)
    setTimeout(() => shuffledDeck.shift(), 2002)
    setTimeout(() => cardSound.play(), 2000)
    setTimeout(() => pTwo.className = `card ${shuffledDeck[0].face}`, 3000)
    setTimeout(() => pTotal += shuffledDeck[0].value, 3001)
    setTimeout(() => shuffledDeck.shift(), 3002)
    setTimeout(() => cardSound.play(), 3000)
    setTimeout(renderPlayerScore, 3003)
    setTimeout(() => dTwo.className = `card ${shuffledDeck[0].face}`, 4000)
    setTimeout(() => dTotal = shuffledDeck[0].value, 4001)
    setTimeout(() => shuffledDeck.shift(), 4002)
    setTimeout(() => cardSound.play(), 4000)
    setTimeout(renderDealerScore, 4003)
    setTimeout(checkForPlayerBJ, 4010)
    setTimeout(checkForDealerBJ, 4015)
    setTimeout(checkForDoubleAces, 4016)
}

function storeAndDeal() {    
    clearTable()
    storeWager()
    dealFirstRound()
    clearWager()
}

// this function deals an additional card when the player clicks the hit button
// the if statement determines where the card gets placed based on if the spot
// is already taken by another card.
function playerHit() {
    if (isBusted === 'false' && turn === 'p') {
    if (pThree.className === 'playerCard') {
        setTimeout(() => pThree.className = `card ${shuffledDeck[0].face}`, 500)
        setTimeout(() => pTotal += shuffledDeck[0].value, 501)
        setTimeout(() => shuffledDeck.shift(), 502)
        setTimeout(() => cardSound.play(), 500)
        setTimeout(renderPlayerScore, 503)
        setTimeout(checkForPlayerBust, 504)
    } else if (pFour.className === 'playerCard') {
        setTimeout(() => pFour.className = `card ${shuffledDeck[0].face}`, 500)
        setTimeout(() => pTotal += shuffledDeck[0].value, 501)
        setTimeout(() => shuffledDeck.shift(), 502)
        setTimeout(() => cardSound.play(), 500)
        setTimeout(renderPlayerScore, 503)
        setTimeout(checkForPlayerBust, 504)
    } else if (pFive.className === 'playerCard') {
        setTimeout(() => pFive.className = `card ${shuffledDeck[0].face}`, 500)
        setTimeout(() => pTotal += shuffledDeck[0].value, 501)
        setTimeout(() => shuffledDeck.shift(), 502)
        setTimeout(() => cardSound.play(), 500)
        setTimeout(renderPlayerScore, 503)
        setTimeout(checkForPlayerBust, 504)
    } else if (pSix.className === 'playerCard') {
        setTimeout(() => pSix.className = `card ${shuffledDeck[0].face}`, 500)
        setTimeout(() => pTotal += shuffledDeck[0].value, 501)
        setTimeout(() => shuffledDeck.shift(), 502)
        setTimeout(() => cardSound.play(), 500)
        setTimeout(renderPlayerScore, 503)
        setTimeout(checkForPlayerBust, 504)
    } else {
        setTimeout(() => pSeven.className = `card ${shuffledDeck[0].face}`, 500)
        setTimeout(() => pTotal += shuffledDeck[0].value, 501)
        setTimeout(() => shuffledDeck.shift(), 502)
        setTimeout(() => cardSound.play(), 500)
        setTimeout(renderPlayerScore, 503)
        setTimeout(checkForPlayerBust, 504)
    }
}
}

function dealerAction() {
    if ((dHidden + dTotal) <= 16) {
    setTimeout(() => dThree.className = `card ${shuffledDeck[0].face}`, 1000)
    setTimeout(() => dTotal += shuffledDeck[0].value, 1001)
    setTimeout(() => cardSound.play(), 1000)
    setTimeout(renderDealerScore, 1002)
    setTimeout(checkForDealerBust, 1002)
    setTimeout(decideNextStep, 1003)
    } else {
        flipDealerCard()
        decideWinner()
    }
}

function decideNextStep() {
    if (dHidden + dTotal <= 16) {
    setTimeout(() => dFour.className = `card ${shuffledDeck[0].face}`, 1000)
    setTimeout(() => dTotal = dTotal + shuffledDeck[0].value, 1001)
    setTimeout(() => cardSound.play(), 1000)
    setTimeout(renderDealerScore, 1002)
    setTimeout(checkForDealerBust, 1002)
    setTimeout(decideNextNextStep, 1003)
    } else {
        flipDealerCard()
        decideWinner()
    }
}

function decideNextNextStep() {
    if (dHidden + dTotal <= 16) {
    setTimeout(() => dFive.className = `card ${shuffledDeck[0].face}`, 1000)
    setTimeout(() => dTotal = dTotal + shuffledDeck[0].value, 1001)
    setTimeout(() => cardSound.play(), 1000)
    setTimeout(renderDealerScore, 1002)
    setTimeout(checkForDealerBust, 1002)
    // setTimeout(decideNextNextStep, 1003)
    } else {
        flipDealerCard()
        decideWinner()
    }
}

function playerStand() {
    if (isBusted === 'false' && turn === 'p') {
    turn = 'd'
    dealerAction()
    }
}

function checkForPlayerBJ() {
    let bjPayout = currWager * 1.5
    if (pTotal === 21) {
        msgCntr.innerHTML = `Player hit blackjack and wins $${bjPayout} in 
        addition to their bet of $${currWager}!`
        bankAmt += bjPayout
        renderBank()
    }
}

function checkForDealerBJ() {
    let dealerTotal = dHidden + dTotal
    if (dealerTotal === 21) {
        msgCntr.innerHTML = `Dealer hit blackjack, player loses.`
        isBusted = 'true'
        flipDealerCard()
    }
}

function flipDealerCard() {
    dOne.className = dOne.className.slice(0, -4)
    dTotal = dTotal + dHidden
    renderDealerScore()
}

function checkForPlayerBust() {
    if (pTotal >= BUST_SCORE) {
        msgCntr.innerHTML = `Player has busted and lost their bet
        of $${currWager}. Feel free to place another wager.`
        isBusted = 'true'
    }
}

function checkForDealerBust() {
    if (dTotal >= BUST_SCORE) {
        msgCntr.innerHTML = `Dealer has busted, Player wins the hand! 
        Winnings of $${currWager} in addition to your original bet have 
        been added to your bankroll!`
        bankAmt += currWager
    }
}

function checkForDoubleAces() {
    if (pTotal === 22) {
        pTotal = 12
    }
}

function decideWinner() {
    if (dTotal > pTotal && dTotal <= 21) {
        setTimeout(handleDealerWin(), 1000)
    } else if (dTotal > pTotal && dTotal > 21) {
        setTimeout(msgCntr.innerHTML = `Dealer has busted, Player wins!
        Winnings of $${currWager} in addition to your original bet have
        been added to your bankroll!`)
        setTimeout(() => bankAmt = parseInt(bankAmt) + parseInt(currWager), 1000)
        setTimeout(renderBank, 1000)
        setTimeout(playChipSound, 1000)
    } else if (dTotal < pTotal) {
        setTimeout(handlePlayerWin(), 1000)
    } else {
        setTimeout(handleTie(), 1000)
    }
}

function handlePlayerWin() {
    msgCntr.innerHTML = `Player Wins! Winnings of $${currWager} in addition to
    your original bet have been added to your bankroll!`
    bankAmt = parseInt(bankAmt) + parseInt(currWager)
    playChipSound
    setTimeout(playChipSound, 50)
    setTimeout(renderBank, 50)
    turn = 'p'
}

function handleDealerWin() {
    msgCntr.innerHTML = `Dealer has ${dTotal} and Player has ${pTotal}, 
    Player loses.`
    flipDealerCard
    turn = 'p'
}

function handleTie() {
    msgCntr.innerHTML = `It's a push, both Dealer and Player have ${pTotal}. Player's
    original bet of $${currWager} has been returned to their bankroll.`
    bankAmt = parseInt(bankAmt) + parseInt(currWager)
    setTimeout(renderBank, 50)
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
    isBusted = 'false'
}

function clearWager() {
    wagerAmt.value = ''
}

function clearMsg() {
    msgCntr.innerHTML = ''
}

/*-------------------------------------------------*/





