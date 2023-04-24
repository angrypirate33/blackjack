/*--------------------constants--------------------*/

///////constsants provided by CSS card library///////
const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const originalDeck = buildOriginalDeck()
///////////////end of provided constants/////////////


/*-------------------------------------------------*/


/*--------------------app state--------------------*/

////////variables provided by CSS card library//////
let shuffledDeck
/////////////end of provided variables/////////////


/*-------------------------------------------------*/


/*----------------cached elements------------------*/



/*-------------------------------------------------*/


/*-----------------event listeners-----------------*/



/*-------------------------------------------------*/


/*--------------------functions--------------------*/

//////FUNCTIONS PROVIDED BY CSS CARD LIBRARY/////////
function getNewShuffledDeck() {
    const tempDeck = [...originalDeck]
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
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
    })
    })
})
return deck;
}
//////////////end of provided functions//////////////

/*-------------------------------------------------*/





