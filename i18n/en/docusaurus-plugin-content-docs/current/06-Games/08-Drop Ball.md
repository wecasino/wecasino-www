<!-- markdownlint-disable MD033 -->

# Drop Ball (DROPBALL)

## Game Code

- GameType: `DROPBALL`
- Value: 34

## Game Description

Drop Ball data format, no shoes, only one host dealer position, using playing card type (POKERCARD). When Drop Ball throws the dice, the field (FIELD) cards in the dealer position (DEALER) in the round data will be updated, and operators will be notified through the data push interface.

When Drop Ball subtype is Drop Ball JACKPOT mode and three balls are the same, enter Drop Ball JACKPOT mode.
Drop Ball JACKPOT mode, no shoes, only one host dealer position, using Lucky Wheel card type (WHEEL). When the lucky wheel finishes spinning, the field (WHEEL) cards in the dealer position (DEALER) in the round data will be updated, and operators will be notified through the data push interface.

## Drop Ball Subtypes

| Card | Description |
|------|-------------|
| DROPBALL_CLASSIC | Classic Drop Ball |
| DROPBALL_COCONUT_BALL | Coconut Ball |
| DROPBALL_JACKPOT | Drop Ball JACKPOT mode |
| DROPBALL_BLOCKCHAIN | Blockchain Drop Ball |

## Seat and Resource Configuration

| Seat | Resource | Card Type | Description |
|------|----------|-----------|-------------|
| DEALER | FIELD | POKER | Current round result |
| DEALER | LUCKY_WHEEL | WHEEL | Drop Ball JACKPOT subtype result |

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

## Lucky Wheel Specific Cards

| Card | Slots | Multiplier | Color |
|------|-------|------------|-------|
| DROP_BALL_WHEEL27X3 | 27 | 3 | Yellow |
| DROP_BALL_WHEEL18X12 | 18 | 12 | Pink |
| DROP_BALL_WHEEL5X16 | 5 | 16 | Green |
| DROP_BALL_WHEEL2X60 | 2 | 60 | Blue |
| DROP_BALL_WHEELAX80 | 1 | 80 | Orange |
| DROP_BALL_WHEELBX100 | 1 | 100 | Red |

## Execution Steps

| Order | Step | Description |
|-------|------|-------------|
| 1 | ROUND_START | Round start<br/>Mark round start |
| 2 | ROUND_BET | Start betting<br/>Duration: betting seconds<br/>ex Duration: 20 = 20 seconds |
| 3 | NO_MORE_BET | Stop betting<br/>Duration: countdown seconds, stop betting countdown prompt |
| 4 | THROW_BALL | Throw ball (get result)<br/>Action:<br/>Cards:<br/>• CardType: POKER (target game is Drop Ball)<br/> |
| 5 | ROUND_FINISHED | Round end<br/>Mark round end |
| 6 | LUCKY_WHEEL_ROUND_READY | Lucky Wheel ready<br/>Notify client to prepare for Lucky Wheel process |
| 7 | LUCKY_WHEEL_ROUND_START | Round start<br/>Mark round officially start |
| 8 | LUCKY_WHEEL_SPIN_WHEEL | Start spinning wheel (SPIN)<br/>Action:<br/>Cards:<br/>• CardType: WHEEL<br/>• List: [{Code: 4}] (indicates opening the 4th slot card) |
| 9 | ROUND_FINISHED | Round end<br/>Mark round end and push result data | 