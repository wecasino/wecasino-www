<!-- markdownlint-disable MD033 -->
# Sicbo (SICBO)

## Game Code

- GameType: `SICBO`
- Value: 32

## Game Description

Sicbo data format, no shoes, only one host dealer position, using Sicbo specific card type DICE. When Sicbo dice are thrown, the field (FIELD) cards in the dealer position (DEALER) in the round data will be updated, and operators will be notified through the data push interface.

## Sicbo Subtypes

| Card | Description |
|------|-------------|
| SICBO_CLASSIC | Classic Sicbo |
| SICBO_FORTUNE | Fortune Sicbo |
| SICBO_BLOCKCHAIN | Blockchain Sicbo |

## Seat and Resource Configuration

| Seat | Resource | Card Type | Description |
|------|----------|-----------|-------------|
| DEALER | FIELD | DICE | Current round result |

## Sicbo Specific Cards

| Card | Description |
|------|-------------|
| DICE_1 | 1 point |
| DICE_2 | 2 points |
| DICE_3 | 3 points |
| DICE_4 | 4 points |
| DICE_5 | 5 points |
| DICE_6 | 6 points |

## Execution Steps

| Order | Step | Description |
|-------|------|-------------|
| 1 | ROUND_START | Round start<br/>Mark round start |
| 2 | ROUND_BET | Start betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 3 | NO_MORE_BET | Stop betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 4 | THROW_DICE | Throw dice (get result)<br/>Action:<br/>Cards:<br/>• CardType: DICE (target game is Sicbo)<br/>• List: [{Code: DICE_2-DICE_3-DICE_5}] (open 2, 3, 5 points) |
| 5 | ROUND_FINISHED | Round end<br/>Mark round end | 