<!-- markdownlint-disable MD033 -->
# Lucky Wheel (LUCKYWHEEL)

## Game Code
- GameType: `LUCKYWHEEL`
- Value: 40

## Game Description

Rainbow Lucky Wheel data format, no shoe, only one main dealer position. Uses Lucky Wheel specific WHEEL card type. After Lucky Wheel stops spinning, updates round data's dealer position (DEALER) field (FIELD) cards. Notifies operators through data push interface.

## Lucky Wheel Subtypes

| Card | Description |
|------|-------------|
| LUCKYWHEEL_RAINBOW | Rainbow Lucky Wheel |

## Seat and Resource Configuration

| Seat | Resource | Card Type | Description |
|------|----------|-----------|-------------|
| DEALER | FIELD | WHEEL | Round result |

## Lucky Wheel Specific Cards

| Card | Grids | Multiplier | Color |
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
| 1 | ROUND_START | Round start<br/>Indicates round beginning |
| 2 | ROUND_BET | Start betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 3 | NO_MORE_BET | Stop betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 4 | SPIN_WHEEL | Spin wheel (get result)<br/>Action:<br/>Cards:<br/>• CardType: WHEEL //target game is Lucky Wheel<br/>• List: [{Code: WHEELAX45}] //landed on Orange 45x |
| 5 | ROUND_FINISHED | Round end<br/>Indicates round completion | 