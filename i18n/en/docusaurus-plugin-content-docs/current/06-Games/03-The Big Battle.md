<!-- markdownlint-disable MD033 -->
# The Big Battle (THEBIGBATTLE)

## Game Code

- GameType: `THEBIGBATTLE`
- Value: 17

## Game Description

The Big Battle data format has shoes, with 1 card each for left and right hand positions, using playing card type (POKERCARD). When player hand cards are revealed, the left/right hand card positions (LEFT/RIGHT) in the round data will be updated, and operators will be notified through the data push interface.

## The Big Battle Subtypes

| Card | Description |
|------|-------------|
| THEBIGBATTLE_CLASSIC | Classic The Big Battle |
| THEBIGBATTLE_SPEED | Speed The Big Battle |
| THEBIGBATTLE_BLOCKCHAIN | Blockchain The Big Battle |
| THEBIGBATTLE_SPEED_BLOCKCHAIN | Blockchain Speed The Big Battle |

## Seat and Resource Configuration

| Seat | Resource | Card Type | Description |
|------|----------|-----------|-------------|
| LEFT | HAND | POKERCARD | Current round result, Left: Dragon from player perspective |
| RIGHT | HAND | POKERCARD | Current round result, Right: Tiger from player perspective |

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
| 2 | DEAL_LEFT | Deal left player hand card |
| 3 | DEAL_RIGHT | Deal right player hand card |
| 4 | ROUND_BET | Start betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 5 | NO_MORE_BET | Stop betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 6 | SHOW_LEFT | Reveal left player hand card (get result)<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD (target game is card)<br/>• List: [{Code: DIAMOND_5}] (open diamond 5) |
| 7 | SHOW_RIGHT | Reveal right player hand card (get result)<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD (target game is card)<br/>• List: [{Code: SPADE_6}] (open spade 6) |
| 8 | ROUND_FINISHED | Round end<br/>Mark round end | 