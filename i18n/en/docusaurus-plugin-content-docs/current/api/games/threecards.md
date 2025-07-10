<!-- markdownlint-disable MD033 -->
# Three Cards (THREECARDS)

## Game Code

- GameType: `THREECARDS`
- Value: 18

## Game Description

Three Cards data format, has shoe, has left and right card positions with 3 cards each. Uses poker card type (POKERCARD). After dealing player cards, updates round data's left/right card positions (LEFT/RIGHT) hand (HAND) cards. Notifies operators through data push interface.

## Three Cards Subtypes

| Card | Description |
|------|-------------|
| THREECARDS_CLASSIC | Classic Three Cards (2 players) |
| THREECARDS_BLOCKCHAIN | Blockchain Three Cards (2 players) |

## Seat and Resource Configuration

| Seat | Resource | Card Type | Description |
|------|----------|-----------|-------------|
| LEFT | HAND | POKERCARD | Round result, Left: Gold from player perspective |
| RIGHT | HAND | POKERCARD | Round result, Right: Silver from player perspective |

## Poker Cards

| Spade Cards | Heart Cards | Club Cards | Diamond Cards | Description |
|-------------|-------------|------------|---------------|-------------|
| SPADE_A | HEART_A | CLUB_A | DIAMOND_A | 1 Point |
| SPADE_2 | HEART_2 | CLUB_2 | DIAMOND_2 | 2 Points |
| SPADE_3 | HEART_3 | CLUB_3 | DIAMOND_3 | 3 Points |
| SPADE_4 | HEART_4 | CLUB_4 | DIAMOND_4 | 4 Points |
| SPADE_5 | HEART_5 | CLUB_5 | DIAMOND_5 | 5 Points |
| SPADE_6 | HEART_6 | CLUB_6 | DIAMOND_6 | 6 Points |
| SPADE_7 | HEART_7 | CLUB_7 | DIAMOND_7 | 7 Points |
| SPADE_8 | HEART_8 | CLUB_8 | DIAMOND_8 | 8 Points |
| SPADE_9 | HEART_9 | CLUB_9 | DIAMOND_9 | 9 Points |
| SPADE_10 | HEART_10 | CLUB_10 | DIAMOND_10 | 10 Points |
| SPADE_J | HEART_J | CLUB_J | DIAMOND_J | 11 Points |
| SPADE_Q | HEART_Q | CLUB_Q | DIAMOND_Q | 12 Points |
| SPADE_K | HEART_K | CLUB_K | DIAMOND_K | 13 Points |

## Execution Steps

| Order | Step | Description |
|-------|------|-------------|
| 1 | ROUND_START | Round start<br/>Indicates round beginning |
| 2 | DEAL_LEFT_1 | Deal left side player card 1 |
| 3 | DEAL_RIGHT_1 | Deal right side player card 1 |
| 4 | DEAL_LEFT_2 | Deal left side player card 2 |
| 5 | DEAL_RIGHT_2 | Deal right side player card 2 |
| 6 | DEAL_LEFT_3 | Deal left side player card 3 |
| 7 | DEAL_RIGHT_3 | Deal right side player card 3 |
| 8 | ROUND_BET | Start betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 9 | NO_MORE_BET | Stop betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 10 | SHOW_LEFT12 | Show left side player cards 1, 2 (get result)<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD //target game is cards<br/>• List: [{Code: DIAMOND_2}] //dealt Diamond 2 |
| 11 | SHOW_RIGHT12 | Show right side player cards 1, 2 (get result)<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD //target game is cards<br/>• List: [{Code: DIAMOND_3}] //dealt Diamond 3 |
| 12 | SHOW_LEFT_3 | Show left side player card 3 (get result)<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD //target game is cards<br/>• List: [{Code: SPADE_7}] //dealt Spade 7 |
| 13 | SHOW_RIGHT_3 | Show right side player card 3 (get result)<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD //target game is cards<br/>• List: [{Code: SPADE_9}] //dealt Spade 9 |
| 14 | ROUND_FINISHED | Round end<br/>Indicates round completion | 