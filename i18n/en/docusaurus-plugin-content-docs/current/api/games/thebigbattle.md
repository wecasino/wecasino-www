<!-- markdownlint-disable MD033 -->
# Dragon Tiger (THEBIGBATTLE)

## Game Code

- GameType: `THEBIGBATTLE`
- Value: 17

## Game Description

Dragon Tiger data format, has shoe, has left and right card positions with 1 card each. Uses poker card type (POKERCARD). After dealing player cards, updates round data's left/right card positions (LEFT/RIGHT) hand (HAND) cards. Notifies operators through data push interface.

## Dragon Tiger Subtypes

| Card | Description |
|------|-------------|
| THEBIGBATTLE_CLASSIC | Classic Dragon Tiger |
| THEBIGBATTLE_SPEED | Speed Dragon Tiger |
| THEBIGBATTLE_BLOCKCHAIN | Blockchain Dragon Tiger |
| THEBIGBATTLE_SPEED_BLOCKCHAIN | Blockchain Speed Dragon Tiger |

## Seat and Resource Configuration

| Seat | Resource | Card Type | Description |
|------|----------|-----------|-------------|
| LEFT | HAND | POKERCARD | Round result, Left: Dragon from player perspective |
| RIGHT | HAND | POKERCARD | Round result, Right: Tiger from player perspective |

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
| 2 | DEAL_LEFT | Deal left side player card |
| 3 | DEAL_RIGHT | Deal right side player card |
| 4 | ROUND_BET | Start betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 5 | NO_MORE_BET | Stop betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 6 | SHOW_LEFT | Show left side player card (get result)<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD //target game is cards<br/>• List: [{Code: DIAMOND_5}] //dealt Diamond 5 |
| 7 | SHOW_RIGHT | Show right side player card (get result)<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD //target game is cards<br/>• List: [{Code: SPADE_6}] //dealt Spade 6 |
| 8 | ROUND_FINISHED | Round end<br/>Indicates round completion | 