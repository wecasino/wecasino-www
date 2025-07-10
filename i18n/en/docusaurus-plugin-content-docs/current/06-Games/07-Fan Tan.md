<!-- markdownlint-disable MD033 -->
# Fan Tan (FANTAN)

## Game Code

- GameType: `FANTAN`
- Value: 20

## Game Description

Fan Tan data format, no shoes, only one host dealer position, using integer card type (INT). When Fan Tan grabs the dice, the field (FIELD) cards in the dealer position (DEALER) in the round data will be updated, and operators will be notified through the data push interface.

## Fan Tan Subtypes

| Card | Description |
|------|-------------|
| FANTAN_CLASSIC | Classic Fan Tan |

## Seat and Resource Configuration

| Seat | Resource | Card Type | Description |
|------|----------|-----------|-------------|
| DEALER | FIELD | INT | Current round result |

## Integer Cards

| Card | Description |
|------|-------------|
| 50-200 (random number) | Fan Tan points divided by 4, remainder 0 becomes 4, get 1~4 value. 0 means not yet revealed. |

## Execution Steps

| Order | Step | Description |
|-------|------|-------------|
| 1 | ROUND_START | Round start<br/>Mark round start |
| 2 | ROUND_BET | Start betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 3 | NO_MORE_BET | Stop betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 4 | GRAB_DICE_AMOUNT | Grab dice (get result)<br/>Action:<br/>Cards:<br/>• CardType: INT (target game is Fan Tan)<br/>• List: [&#123;Code: 149&#125;] (open 149 points divided by 4 to get 1~4 value) |
| 5 | ROUND_FINISHED | Round end<br/>Mark round end |
