<!-- markdownlint-disable MD033 -->

# Color Game (COLORGAME)

## Game Code

- GameType: `COLORGAME`
- Value: 33

## Game Description

Color Game data format, no shoes, only one host dealer position, using color card type (COLOR). When Color Game throws the dice, the field (NORMAL) cards in the dealer position (DEALER) in the round data will be updated, and operators will be notified through the data push interface.
When three colors are the same, enter SUPER GAME mode.
SUPER GAME mode, no shoes, only one host dealer position, using color card type (COLOR). When SUPER GAME throws the dice, the field (SUPER_GAME) cards in the dealer position (DEALER) in the round data will be updated, and operators will be notified through the data push interface.

## Color Game Subtypes

| Card | Description |
|------|-------------|
| COLORGAME_CLASSIC | Classic Color Game |
| COLOR_MINI | Mini Color Game |
| COLORGAME_BLOCKCHAIN | Blockchain Color Game |

## Seat and Resource Configuration

| Seat | Resource | Card Type | Description |
|------|----------|-----------|-------------|
| DEALER | NORMAL | COLOR | Current round result |
| DEALER | SUPER_GAME | COLOR | Color Game SUPER GAME result |

## Color Game Specific Cards

| Card | Color |
|------|-------|
| Color_1 | Yellow |
| Color_2 | Blue |
| Color_3 | Pink |
| Color_4 | Green |
| Color_5 | Red |
| Color_6 | White |

## Execution Steps

| Order | Step | Description |
|-------|------|-------------|
| 1 | ROUND_START | Round start<br/>Mark round start |
| 2 | ROUND_BET | Start betting<br/>Duration: betting seconds<br/>ex Duration: 25 = 25 seconds |
| 3 | NO_MORE_BET | Stop betting<br/>Duration: countdown seconds, stop betting countdown prompt |
| 4 | THROW_COLOR | Throw ball (color result)<br/>Action:<br/>Cards:<br/>• CardType: Color (target game is Color Game) |
| 5 | ROUND_FINISHED | Round end<br/>Mark round end |
| 6 | SUPER_GAME_ROUND_READY | SUPER GAME ready<br/>Notify client to prepare for SUPER GAME process |
| 7 | SUPER_GAME_ROUND_START | SUPER GAME start<br/>Mark SUPER GAME officially start |
| 8 | SUPER_GAME_ROUND_BET | SUPER GAME betting phase<br/>Duration: SUPER GAME betting time |
| 9 | SUPER_GAME_NO_MORE_BET | SUPER GAME stop betting<br/>Countdown prompt end |
| 10 | SUPER_GAME_THROW_COLOR | SUPER GAME throw ball result<br/>Action:<br/>Cards:<br/>• CardType: Color<br/>• List: [&#123;Code: 4&#125;] (open the 4th slot) |
| 11 | ROUND_FINISHED | Round end<br/>Push result data |
