<!-- markdownlint-disable MD033 -->
# Lucky Wheel (LUCKYWHEEL)

## Game Code

- GameType: `LUCKYWHEEL`
- Value: 40

## Game Description

Rainbow Lucky Wheel data format, no shoes, only one host dealer position, using Lucky Wheel specific card type WHEEL. When the lucky wheel stops spinning, the field (FIELD) cards in the dealer position (DEALER) in the round data will be updated, and operators will be notified through the data push interface.

## Lucky Wheel Subtypes

| Card | Description |
|------|-------------|
| LUCKYWHEEL_RAINBOW | Rainbow Lucky Wheel |

## Seat and Resource Configuration

| Seat | Resource | Card Type | Description |
|------|----------|-----------|-------------|
| DEALER | FIELD | WHEEL | Current round result |

## Lucky Wheel Specific Cards

| Card | Slots | Multiplier | Color |
|------|-------|------------|-------|
| WHEEL24X1 | 24 | 1 | Yellow |
| WHEEL12X3 | 12 | 3 | Blue |
| WHEEL8X5 | 8 | 5 | Pink |
| WHEEL4X10 | 4 | 10 | Green |
| WHEEL2X20 | 2 | 20 | Purple |
| WHEELAX45 | 1 | 45 | Orange |
| WHEELBX45 | 1 | 45 | Red |

## Execution Steps

| Order | Step | Description |
|-------|------|-------------|
| 1 | ROUND_START | Round start<br/>Mark round start |
| 2 | ROUND_BET | Start betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 3 | NO_MORE_BET | Stop betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 4 | SPIN_WHEEL | Spin wheel (get result)<br/>Action:<br/>Cards:<br/>• CardType: WHEEL (target game is Lucky Wheel)<br/>• List: [&#123;Code: WHEELAX45&#125;] (open orange 45x) |
| 5 | ROUND_FINISHED | Round end<br/>Mark round end |
