<!-- markdownlint-disable MD033 -->
# Three Cards (THREECARDS)

## Game Code

- GameType: `THREECARDS`
- Value: 18

## Game Description

Three Cards data format has shoes, with 3 cards each for left and right hand positions, using playing card type (POKERCARD). When player hand cards are revealed, the left/right hand card positions (LEFT/RIGHT) in the round data will be updated, and operators will be notified through the data push interface.

## Three Cards Subtypes

| Card | Description |
|------|-------------|
| THREECARDS_CLASSIC | Classic Three Cards (2 players) |
| THREECARDS_BLOCKCHAIN | Blockchain Three Cards (2 players) |

## Seat and Resource Configuration

| Seat | Resource | Card Type | Description |
|------|----------|-----------|-------------|
| LEFT | HAND | POKERCARD | Current round result, Left: Gold from player perspective |
| RIGHT | HAND | POKERCARD | Current round result, Right: Silver from player perspective |

## Playing Card Specific Cards

| Spade Cards | Heart Cards | Club Cards | Diamond Cards | Description |
|-------------|-------------|------------|---------------|-------------|
| SPADE_A | HEART_A | CLUB_A | DIAMOND_A | 1 point |
| SPADE_2 | HEART_2 | CLUB_2 | DIAMOND_2 | 2 points |
| SPADE_3 | HEART_3 | CLUB_3 | DIAMOND_3 | 3 points |
| SPADE_4 | HEART_4 | CLUB_4 | DIAMOND_4 | 4 points |
| SPADE_5 | HEART_5 | CLUB_5 | DIAMOND_5 | 5 points |
| SPADE_6 | HEART_6 | CLUB_6 | DIAMOND_6 | 6 points |
| SPADE_7 | HEART_7 | CLUB_7 | DIAMOND_7 | 7 points |
| SPADE_8 | HEART_8 | CLUB_8 | DIAMOND_8 | 8 points |
| SPADE_9 | HEART_9 | CLUB_9 | DIAMOND_9 | 9 points |
| SPADE_10 | HEART_10 | CLUB_10 | DIAMOND_10 | 10 points |
| SPADE_J | HEART_J | CLUB_J | DIAMOND_J | 11 points |
| SPADE_Q | HEART_Q | CLUB_Q | DIAMOND_Q | 12 points |
| SPADE_K | HEART_K | CLUB_K | DIAMOND_K | 13 points |

## Execution Steps

| Order | Step | Description |
|-------|------|-------------|
| 1 | ROUND_START | Round start<br/>Mark round start |
| 2 | DEAL_LEFT_1 | Deal left player hand card 1 |
| 3 | DEAL_RIGHT_1 | Deal right player hand card 1 |
| 4 | DEAL_LEFT_2 | Deal left player hand card 2 |
| 5 | DEAL_RIGHT_2 | Deal right player hand card 2 |
| 6 | DEAL_LEFT_3 | Deal left player hand card 3 |
| 7 | DEAL_RIGHT_3 | Deal right player hand card 3 |
| 8 | ROUND_BET | Start betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 9 | NO_MORE_BET | Stop betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 10 | SHOW_LEFT12 | Reveal left player hand cards 1, 2 (get result)<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD (target game is card)<br/>• List: [{Code: DIAMOND_2}] (open diamond 2) |
| 11 | SHOW_RIGHT12 | Reveal right player hand cards 1, 2 (get result)<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD (target game is card)<br/>• List: [{Code: DIAMOND_3}] (open diamond 3) |
| 12 | SHOW_LEFT_3 | Reveal left player hand card 3 (get result)<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD (target game is card)<br/>• List: [{Code: SPADE_7}] (open spade 7) |
| 13 | SHOW_RIGHT_3 | Reveal right player hand card 3 (get result)<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD (target game is card)<br/>• List: [{Code: SPADE_9}] (open spade 9) |
| 14 | ROUND_FINISHED | Round end<br/>Mark round end | 