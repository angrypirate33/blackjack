```
 /$$$$$$$  /$$                     /$$          /$$$$$                     /$$      
| $$__  $$| $$                    | $$         |__  $$                    | $$      
| $$  \ $$| $$  /$$$$$$   /$$$$$$$| $$   /$$      | $$  /$$$$$$   /$$$$$$$| $$   /$$
| $$$$$$$ | $$ |____  $$ /$$_____/| $$  /$$/      | $$ |____  $$ /$$_____/| $$  /$$/
| $$__  $$| $$  /$$$$$$$| $$      | $$$$$$/  /$$  | $$  /$$$$$$$| $$      | $$$$$$/ 
| $$  \ $$| $$ /$$__  $$| $$      | $$_  $$ | $$  | $$ /$$__  $$| $$      | $$_  $$ 
| $$$$$$$/| $$|  $$$$$$$|  $$$$$$$| $$ \  $$|  $$$$$$/|  $$$$$$$|  $$$$$$$| $$ \  $$
|_______/ |__/ \_______/ \_______/|__/  \__/ \______/  \_______/ \_______/|__/  \__/
```


# The Game of Twenty-One

## Description
Blackjack is a card game that is played against a dealer. The goal of the game is to get a hand that is worth more than the dealer's hand, but not over 21. Blackjack is believed to have originated in France in the 17th century. The game was then brought to the United States, where it quickly became popular.

Blackjack is one of the most popular casino games in the world. It is a relatively simple game to learn, but it can be challenging to master. Blackjack is also a game of chance, so there is always the possibility of losing money. However, for many people, the thrill of the game is worth the risk.

## Screenshots
### Initial State
![Alt text](images/BJ%20Screen%201.png)
### After First Round
![Alt text](images/BJ%20Screen%202.png)
### After Final Round
![](images/BJ%20Screen%203.png)

## Technologies Used
- HTML
- CSS
    - Playing card CSS library provided by GA.
        - https://replit.com/@SEIStudent/How-to-Use-CSS-Card-Library#index.html
    - No additional libraries or frameworks were used.
- JavaScript
    - No libraries used, vanilaa JavaScript only.
- Sound effects
    - Open-source, provided for free by https://www.zapsplat.com.

## Geetting Started
Game can be accessed at https://angrypirate33.github.io/blackjack/.

1) Enter wager in input box, either via keyboard or built-in up and down arrows.
2) When desired wager amount is entered, click "Place Bet" to start the hand.
3) After the first four cards are dealt, player must decide how to proceed.
    - If the player does not want any additional cards, they should click "Stand".
    - If the player does want additional cards, they should click "Hit".
    - Player continues to click "Hit" until they no longer want cards, then click "Stand".
    - If the player's total goes over 21 at any point, they bust and immediately lose the hand.
    - Once player clicks "Stand", the dealer will complete the hand and the results will be displayed.
    - If the player loses, the hand is over and the player can bet again.
    - If the player wins, the amount of their bet plus their winnings are added to their bankroll.

## Planned Future Enhancements
- Ability for player to split hands.
- Ability for player to double down.
- Ability to chnage table color.
- Ability to mute sounds.