<!-- markdownlint-disable MD033 -->
# Sic Bo (SICBO)

## Game Code

- GameType: `SICBO`
- Value: 32

## Game Description

Sic Bo data format, no shoe, only one main dealer position. Uses Sic Bo specific DICE card type. After Sic Bo dice throwing, updates round data's dealer position (DEALER) field (FIELD) cards. Notifies operators through data push interface.

## Sic Bo Subtypes

| Card | Description |
|------|-------------|
| SICBO_CLASSIC | Classic Sic Bo |
| SICBO_FORTUNE | Fortune Sic Bo |
| SICBO_BLOCKCHAIN | Blockchain Sic Bo |

## Seat and Resource Configuration

| Seat | Resource | Card Type | Description |
|------|----------|-----------|-------------|
| DEALER | FIELD | DICE | Round result |

## Sic Bo Specific Cards

| Card | Description |
|------|-------------|
| DICE_1 | 1 Point |
| DICE_2 | 2 Points |
| DICE_3 | 3 Points |
| DICE_4 | 4 Points |
| DICE_5 | 5 Points |
| DICE_6 | 6 Points |

## Execution Steps

| Order | Step | Description |
|-------|------|-------------|
| 1 | ROUND_START | Round start<br/>Indicates round beginning |
| 2 | ROUND_BET | Start betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 3 | NO_MORE_BET | Stop betting<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 4 | THROW_DICE | Throw dice (get result)<br/>Action:<br/>Cards:<br/>• CardType: DICE //target game is Sic Bo<br/>• List: [{Code: DICE_2-DICE_3-DICE_5}] //rolled 2, 3, 5 points |
| 5 | ROUND_FINISHED | Round end<br/>Indicates round completion | 