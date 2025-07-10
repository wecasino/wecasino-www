<!-- markdownlint-disable MD033 -->
# Game

## Game Types

| Value | Code | Game Name |
|-------|------|-----------|
| 0 | GAME_TYPE_UNSPECIFIED | Unspecified |
| 16 | BACCARAT | Baccarat |
| 17 | THEBIGBATTLE | Dragon Tiger |
| 18 | THREECARDS | Three Cards |
| 20 | FANTAN | Fan Tan |
| 32 | SICBO | Sic Bo |
| 40 | LUCKYWHEEL | Lucky Wheel |

## Flow Common Parameters

* This API data format is common to various game types, so many fields will change depending on the game.
* However, many games are similar, so some common flow parameters are defined that each game can use directly.

### Seats

* "Seats" represent players, dealers, banker, player, or any place where cards may belong in the game

* Common seat values

| Value | Code | Description |
|-------|------|-------------|
| 0 | SEAT_UNSPECIFIED | Unspecified |
| 64 | DEALER | Dealer |
| 65 | PREVIOUS_DEALER | Previous Dealer |
| 66 | PITBOSS | Pit Boss |
| 67 | PREVIOUS_PITBOSS | Previous Pit Boss |
| 68 | PLAYER | Player |
| 69 | BANKER | Banker |
| 70 | LEFT | Left |
| 71 | RIGHT | Right |
| 96 | CONTROL | Flow Control Card |
| 99 | Instructions | Player Instructions |

### Resource Types

* "Resource Type" indicates the possible classification of these cards. For example: in Baccarat, seat: Player has two resources: "natural cards" and "third card"

| Value | Code | Description |
|-------|------|-------------|
| 0 | RESOURCE_TYPE_UNSPECIFIED | Unspecified |
| 64 | SHOE | Shoe |
| 65 | HAND | Hand |
| 66 | FIELD | Field |
| 67 | FIRST_CARD | First Card |
| 68 | SHOE_CUT | Cut Card |
| 69 | DISCARD | Discard |

### Win/Loss

* Record win/loss results

| Value | Code | Description |
|-------|------|-------------|
| 0 | WIN_TYPE_UNSPECIFIED | Unspecified |
| 1 | LOSE | Lose |
| 2 | WIN | Win |
| 3 | TIE | Tie |

## Cards

### Poker Cards

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

### Dice

| Value | Code | Description |
|-------|------|-------------|
| 0 | DICE_CARD_UNSPECIFIED | Unspecified |
| 1 | DICE_1 | 1 Point |
| 2 | DICE_2 | 2 Points |
| 3 | DICE_3 | 3 Points |
| 4 | DICE_4 | 4 Points |
| 5 | DICE_5 | 5 Points |
| 6 | DICE_6 | 6 Points |

### Lucky Wheel

| Value | Code | Description |
|-------|------|-------------|
| 0 | WHEEL_UNSPECIFIED | Unspecified |
| 1 | WHEEL24X1 | 24 Grids 1x |
| 2 | WHEEL12X3 | 12 Grids 3x |
| 3 | WHEEL8X5 | 8 Grids 5x |
| 4 | WHEEL4X10 | 4 Grids 10x |
| 5 | WHEEL2X20 | 2 Grids 20x |
| 6 | WHEELAX45 | 1 Grid 45x |
| 7 | WHEELBX45 | 1 Grid 45x | 