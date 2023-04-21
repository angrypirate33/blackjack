# Planning for Blackjack broweser game

```
.------..------..------..------..------..------..------..------..------.
|B.--. ||L.--. ||A.--. ||C.--. ||K.--. ||J.--. ||A.--. ||C.--. ||K.--. |
| :(): || :/\: || (\/) || :/\: || :/\: || :(): || (\/) || :/\: || :/\: |
| ()() || (__) || :\/: || :\/: || :\/: || ()() || :\/: || :\/: || :\/: |
| '--'B|| '--'L|| '--'A|| '--'C|| '--'K|| '--'J|| '--'A|| '--'C|| '--'K|
`------'`------'`------'`------'`------'`------'`------'`------'`------'
```

## Application functionality

Minimum Viable Product (need to have)
- GA project requirements.
    - Render in browser.
    - Include win/loss logic and render win/loss messages in HTML.
    - Include separate HTML, CSS, and JavaScript files.
    - Use vanilaa JavaScript
    - Have properly indented code.
    - Contain no un-used/commented out code.
    - Functions and variables named sensibly.
    - Coded in a consistant manner.
    - Be deployed online using GitHub pages.
- Blackjack specific requirements.
    - Shuffle deck(s) and deal cards to payer(s) and dealer.
    - Allow player to place a wager and track player's bankroll.
    - Allow player to hit or stand after each hand.
    - Dealer (AI) plays according to the rules of blackjack.
    - Display the current amount in the player's bankroll.


- Icebox items (nice to have)
    - User can choose color of "table" from default green.
    - Splatting hands.
    - Doubling down.
    - Buying insurance.
    - Hand counter.

## Design
- The deck of cards will come from the included css package.
- The default table color will be green.
- The design should mimic a card table.


## UI Wireframe

![Alt text](Blackjack%20Wireframe.png)


## Pseudocode

1) Define required constants.
    - Bust score - 21.
    - Dealer hit/stay score - 16.
    - Turn 1 | -1.
    - Black combos A|K, A|Q, A|J, A|10.

2) Define required variables.
    - Current wager amount.
    - Current bankroll amount.
    - Current player score.
    - Current dealer score.

3) Cache DOM elements.
    - Deal  button.
    - Wager buttons.
    - Hit/stand buttons.
    - Message center.
    - Bankroll information center.
    - Player and computer initial two cards.
    - Player and computer possible additional cards.
    - Cash out! button.

4) Upon loading the app should:
    - Render an empty table with a full $1000 bankroll.
    - Render the upside down deck of cards to be dealt.
    - Randomly shuffle the deck.
    - Wait for the player to click the deal button.

5) Handle player placing wager and track bankroll.
    - Allow player to enter number wager or increment with buttons.
    - Add/remove from the player's bankroll based on the outcome of each hand.
    - Keep track of bankroll throughout the duration of the game.

6) Handle a player click the hit or stand buttons.
    - Player has the option to hit or stand after the first two cards are deatl.
    - Player can hit as many times as they want as long as their score remains <= 21.
    - If player's score goes over 21, game ends.

7) Determine a winner and settle wager.
    - Once player hits the stand button, it is the computer's turn.
    - The computer will hit or stand according to the rules of blackjack.
    - The winner is the closest to 21 without going over at the end of the hand.
    - If the player wins, their wager is doubled and added back to their bankroll.
    - If the player loses, their wager is lost.
    - If the player gets a blackjack, three times their wager is added to their bankroll.
