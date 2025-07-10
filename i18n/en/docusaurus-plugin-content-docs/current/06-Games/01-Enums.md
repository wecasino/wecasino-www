<!-- markdownlint-disable MD033 -->
# Game

## Game Types

| Value | Code | Game Name |
|-------|------|-----------|
| 0 | GAME_TYPE_UNSPECIFIED | Unspecified |
| 16 | BACCARAT | Baccarat |
| 17 | THEBIGBATTLE | The Big Battle |
| 18 | THREECARDS | Three Cards |
| 20 | FANTAN | Fan Tan |
| 32 | SICBO | Sicbo |
| 40 | LUCKYWHEEL | Lucky Wheel |

## Common Flow Parameters

* This API data format is universal across various game types, so many fields will vary according to the game.
* However, many games are similar, so some common flow parameters are defined that can be used directly by each game.

### Seats

* "Seats" are used to represent players, dealers, banker, player, etc. in the game - any place where cards might belong

* Common seat values

| Value | Code | Description |
|-------|------|-------------|
| 0 | SEAT_UNSPECIFIED | Unspecified |
| 64 | DEALER | Dealer |
| 65 | PREVIOUS_DEALER | Previous dealer |
| 66 | PITBOSS | Pit boss |
| 67 | PREVIOUS_PITBOSS | Previous pit boss |
| 68 | PLAYER | Player |
| 69 | BANKER | Banker |
| 70 | LEFT | Left |
| 71 | RIGHT | Right |
| 96 | CONTROL | Flow control card |
| 99 | Instructions | Player instructions |

### Resource Types

* "Resource types" indicate possible classifications of these cards, for example: in Baccarat, seat: player, has "initial cards" and "draw cards" two types of resources

| Value | Code | Description |
|-------|------|-------------|
| 0 | RESOURCE_TYPE_UNSPECIFIED | Unspecified |
| 64 | SHOE | Shoe |
| 65 | HAND | Hand |
| 66 | FIELD | Field |
| 67 | FIRST_CARD | First card |
| 68 | SHOE_CUT | Cut card |
| 69 | DISCARD | Discard |

### Win/Loss

* Record win/loss

| Value | Code | Description |
|-------|------|-------------|
| 0 | WIN_TYPE_UNSPECIFIED | Unspecified |
| 1 | LOSE | Lose |
| 2 | WIN | Win |
| 3 | TIE | Tie |

## Cards

### Playing Cards

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

### Dice

| Value | Code | Description |
|-------|------|-------------|
| 0 | DICE_CARD_UNSPECIFIED | Unspecified |
| 1 | DICE_1 | 1 point |
| 2 | DICE_2 | 2 points |
| 3 | DICE_3 | 3 points |
| 4 | DICE_4 | 4 points |
| 5 | DICE_5 | 5 points |
| 6 | DICE_6 | 6 points |

### Lucky Wheel

| Value | Code | Description |
|-------|------|-------------|
| 0 | WHEEL_UNSPECIFIED | Unspecified |
| 1 | WHEEL24X1 | 24 slots 1x |
| 2 | WHEEL12X3 | 12 slots 3x |
| 3 | WHEEL8X5 | 8 slots 5x |
| 4 | WHEEL4X10 | 4 slots 10x |
| 5 | WHEEL2X20 | 2 slots 20x |
| 6 | WHEELAX45 | 1 slot 45x |
| 7 | WHEELBX45 | 1 slot 45x |
