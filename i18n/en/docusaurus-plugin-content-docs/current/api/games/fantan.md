<!-- markdownlint-disable MD033 -->
# Fan Tan (FANTAN)

## Game Code

- GameType: `FANTAN`
- Value: 20

## Game Description

Fan Tan data format, no shoe, only one main dealer position. Uses integer card type (INT). After Fan Tan dice grab, updates round data's dealer position (DEALER) field (FIELD) cards. Notifies operators through data push interface.

## Fan Tan Subtypes

| Card | Description |
|------|-------------|
| FANTAN_CLASSIC | Classic Fan Tan |

## Seat and Resource Configuration

| Seat | Resource | Card Type | Description |
|------|----------|-----------|-------------|
| DEALER | FIELD | INT | Round result |

## Integer Cards

| Card | Description |
|------|-------------|
| 50-200(random number) | Fan Tan points divided by 4, remainder 0 equals 4, gets 1~4 value. 0 means not yet dealt. |

## Execution Steps

| Order | Step | Description |
|-------|------|-------------|
| 1 | ROUND_START | Round start<br/>Indicates round beginning |
| 2 | ROUND_BET | Start betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 3 | NO_MORE_BET | Stop betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 4 | GRAB_DICE_AMOUNT | Grab dice (get result)<br/>Action:<br/>Cards:<br/>• CardType: INT //target game is Fan Tan<br/>• List: [{Code: 149}] //dealt 149 points divided by 4 to get 1~4 value |
| 5 | ROUND_FINISHED | Round end<br/>Indicates round completion | 