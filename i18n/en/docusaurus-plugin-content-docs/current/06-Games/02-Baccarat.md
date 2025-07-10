<!-- markdownlint-disable MD033 -->
# Baccarat (BACCARAT)

## Game Code

- GameType: `BACCARAT`
- Value: 16

## Game Description

Baccarat data format has shoes, with 4-6 cards each for banker and player initial and draw positions, using playing card type (POKERCARD). When player hand cards are revealed, the left banker/player Normal/Extra card positions (BANKER/PLAYER) in the round data will be updated, and operators will be notified through the data push interface.

## Baccarat Subtypes

| Subtype | Description |
|---------|-------------|
| BACCARAT_CLASSIC | Classic Baccarat |
| BACCARAT_TRADITIONAL | Traditional Baccarat |
| BACCARAT_SPEED | Speed Baccarat |
| BACCARAT_PEEK | Peek Baccarat |
| BACCARAT_FORTUNE | Fortune Baccarat |
| BACCARAT_BLOCKCHAIN | Blockchain Baccarat |
| BACCARAT_SPEED_BLOCKCHAIN | Blockchain Speed Baccarat |
| BACCARAT_PEEK_BLOCKCHAIN | Blockchain Peek Baccarat |

## Used Seats & Resources

| Seat | Resource | Description |
|------|----------|-------------|
| pbGames.FlowSeat_PLAYER | pbBaccarat.ResourceType_NORMAL | Current round result, player initial cards |
| pbGames.FlowSeat_PLAYER | pbBaccarat.ResourceType_EXTRA | Current round result, player draw cards |
| pbGames.FlowSeat_BANKER | pbBaccarat.ResourceType_NORMAL | Current round result, banker initial cards |
| pbGames.FlowSeat_BANKER | pbBaccarat.ResourceType_EXTRA | Current round result, banker draw cards |

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

## Execution Steps (Classic, Fortune, Speed, Traditional)

Data is written to recorder.process after each step

| Order | Step | Description |
|-------|------|-------------|
| 1 | Step_ROUND_START | Round start (NOTIFY_ROUND_START) |
| 2 | Step_ROUND_BET | Start betting (NOTIFY_ROUND_BET)<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 3 | Step_NO_MORE_BET | Stop betting (NOTIFY_ROUND_NO_MORE_BET)<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 4 | Step_SHOW_PLAYER_1 | Reveal player hand card 1 NOTIFY_ROUND_STEP (get reveal result) |
| 5 | Step_SHOW_BANKER_1 | Reveal banker hand card 1 NOTIFY_ROUND_STEP (get reveal result) |
| 6 | Step_SHOW_PLAYER_2 | Reveal player hand card 2 NOTIFY_ROUND_STEP (get reveal result) |
| 7 | Step_SHOW_BANKER_2 | Reveal banker hand card 2 NOTIFY_ROUND_STEP (get reveal result) |
| 8 | Step_DEAL_PLAYER_EXTRA | Reveal player draw card NOTIFY_ROUND_STEP (get reveal result) |
| 9 | Step_DEAL_BANKER_EXTRA | Reveal banker draw card NOTIFY_ROUND_STEP (get result) |
| 10 | Step_DEALER_CONFIRM | Dealer confirmation phase NOTIFY_ROUND_STEP |
| 11 | Step_ROUND_FINISHED | Round end, send NOTIFY_ROUND_FINISH notification for settlement |

## Execution Steps (Peek)

Data is written to recorder.process after each step

| Order | Step | Description |
|-------|------|-------------|
| 1 | Step_ROUND_START | Round start (NOTIFY_ROUND_START) |
| 2 | Step_ROUND_BET | Start betting send NOTIFY_ROUND_BET notification<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 3 | Step_NO_MORE_BET | Stop betting NOTIFY_ROUND_NO_MORE_BET notification<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 4 | Step_PEEK_NORMAL | Peek field initial cards NOTIFY_ROUND_STEP (get reveal result)<br/>Duration: peek time |
| 5 | Step_PEEK_SHOW_NORMAL | Reveal field initial cards NOTIFY_ROUND_STEP (get reveal result) |
| 6 | Step_PEEK_DEAL_PLAYER_EXTRA | Peek player draw card NOTIFY_ROUND_STEP (get reveal result)<br/>Duration: peek time |
| 7 | Step_PEEK_SHOW_PLAYER_EXTRA | Reveal player draw card NOTIFY_ROUND_STEP |
| 8 | Step_PEEK_DEAL_BANKER_EXTRA | Peek banker draw card NOTIFY_ROUND_STEP (get reveal result)<br/>Duration: peek time |
| 9 | Step_PEEK_SHOW_BANKER_EXTRA | Reveal banker draw card NOTIFY_ROUND_STEP |
| 10 | Step_DEALER_CONFIRM | Dealer confirmation phase NOTIFY_ROUND_STEP |
| 11 | Step_ROUND_FINISHED | Round end, send NOTIFY_ROUND_FINISH notification event |

## Execution Steps (Electronic Type)

Data is written to recorder.process after each step

| Order | Step | Description |
|-------|------|-------------|
| 1 | Step_ROUND_START | Round start (NOTIFY_ROUND_START) |
| 2 | Step_DEAL_PLAYER_1 | Deal player hand card 1 NOTIFY_ROUND_STEP (electronic type pre-deals face-down cards) |
| 3 | Step_DEAL_BANKER_1 | Deal banker hand card 1 NOTIFY_ROUND_STEP (electronic type pre-deals face-down cards) |
| 4 | Step_DEAL_PLAYER_2 | Deal player hand card 2 NOTIFY_ROUND_STEP (electronic type pre-deals face-down cards) |
| 5 | Step_DEAL_BANKER_2 | Deal banker hand card 2 NOTIFY_ROUND_STEP (electronic type pre-deals face-down cards) |
| 6 | Step_ROUND_BET | Start betting (NOTIFY_ROUND_BET)<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 7 | Step_NO_MORE_BET | Stop betting (NOTIFY_ROUND_NO_MORE_BET)<br/>Duration: betting seconds<br/>ex Duration: 45 = 45 seconds |
| 8 | Step_SHOW_PLAYER_1 | Reveal player hand card 1 NOTIFY_ROUND_STEP (get reveal result) |
| 9 | Step_SHOW_BANKER_1 | Reveal banker hand card 1 NOTIFY_ROUND_STEP (get reveal result) |
| 10 | Step_SHOW_PLAYER_2 | Reveal player hand card 2 NOTIFY_ROUND_STEP (get reveal result) |
| 11 | Step_SHOW_BANKER_2 | Reveal banker hand card 2 NOTIFY_ROUND_STEP (get reveal result) |
| 12 | Step_DEAL_PLAYER_EXTRA | Reveal player draw card NOTIFY_ROUND_STEP (get reveal result) |
| 13 | Step_DEAL_BANKER_EXTRA | Reveal banker draw card NOTIFY_ROUND_STEP (get result) |
| 14 | Step_DEALER_CONFIRM | Dealer confirmation phase NOTIFY_ROUND_STEP |
| 15 | Step_ROUND_FINISHED | Round end, send NOTIFY_ROUND_FINISH notification for settlement |

## Game Event Notifications

### Table Event Notifications (provider parsing)

| Event Type | Description |
|------------|-------------|
| GameNotifyType_NOTIFY_GAME_PROVIDE_STATE_CHANGE | Table status change |
| GameNotifyType_NOTIFY_GAME_DEALER_LOGIN | Dealer login code name related |
| GameNotifyType_NOTIFY_GAME_DEALER_LOGOUT | Dealer logout code name related |
| GameNotifyType_NOTIFY_GAME_CHANGING_SHOE | Change shoe |
| GameNotifyType_NOTIFY_GAME_CAPTURE | Thumbnail image used for dealer photo |

### Table Shift Round Event Notifications (ShiftRecord parsing)

| Event Type | Description |
|------------|-------------|
| GameNotifyType_NOTIFY_SHIFT_START | Shift start |
| GameNotifyType_NOTIFY_SHIFT_END | Shift end |

### Table Shift Round Event Notifications (ShoeRecord parsing)

| Event Type | Description |
|------------|-------------|
| GameNotifyType_NOTIFY_SHOE_START | Shoe number start |
| GameNotifyType_NOTIFY_SHOE_END | Shoe number end |

### Round Related (RoundRecord parsing)

| Event Type | Description |
|------------|-------------|
| GameNotifyType_NOTIFY_ROUND_START | Notify game start (can use start betting beginning, can ignore) |
| GameNotifyType_NOTIFY_ROUND_BET | Notify game start betting |
| GameNotifyType_NOTIFY_ROUND_NO_MORE_BET | Notify game stop betting |
| GameNotifyType_NOTIFY_ROUND_STEP | Notify game round history |
| GameNotifyType_NOTIFY_ROUND_FINISH | Notify game round result |
| GameNotifyType_NOTIFY_ROUND_CANCEL | Notify game round cancel |
| GameNotifyType_NOTIFY_ROUND_PLAYBACK | Notify game round replay video URL |
| GameNotifyType_NOTIFY_ROUND_CANCEL_AFTER_ROUND | Post-round cancel result |
| GameNotifyType_NOTIFY_ROUND_MODIFY_AFTER_ROUND | Post-round modify card face result |
| GameNotifyType_NOTIFY_ROUND_FINISH_AFTER_ROUND | Input result through backend |

## Parse Card Face Example

Parse roundRecord based on GameNotifyType_NOTIFY_ROUND_STEP event to get which cards are currently revealed on the field

```go
import (
    pbBaccarat "github.com/wecasino/wecasino-proto/pbgo/games/baccarat"
    pbRecorder "github.com/wecasino/wecasino-proto/pbgo/recorder"
)

func ParseRoundCardsIndex(ctx context.Context, round *pbRecorder.RoundRecord) (b1, b2, b3, p1, p2, p3 string) {
    banker := round.Seats[int32(pbGames.FlowSeat_BANKER)]
    bankerNormal := banker.GetCards()[int32(pbBaccarat.ResourceType_NORMAL)].GetList()
    if len(bankerNormal) > 0 {
        b1 = bankerNormal[0].GetCode()
    }
    if len(bankerNormal) > 1 {
        b2 = bankerNormal[1].GetCode()
    }
    bankerExtra := banker.GetCards()[int32(pbBaccarat.ResourceType_EXTRA)].GetList()
    if len(bankerExtra) > 0 {
        b3 = bankerExtra[0].GetCode()
    }

    player := round.Seats[int32(pbGames.FlowSeat_PLAYER)]
    playerNormal := player.GetCards()[int32(pbBaccarat.ResourceType_NORMAL)].GetList()
    if len(playerNormal) > 0 {
        p1 = playerNormal[0].GetCode()
    }
    if len(playerNormal) > 1 {
        p2 = playerNormal[1].GetCode()
    }
    playerExtra := player.GetCards()[int32(pbBaccarat.ResourceType_EXTRA)].GetList()
    if len(playerExtra) > 0 {
        p3 = playerExtra[0].GetCode()
    }
    return
}
```

## Fortune Number Description

The roundRecord attribute has FortuneRate showing card corresponding multiplier, announced when betting stops. If there are corresponding fortune cards on the field, adjust payout according to game rules.

Example: `map["CLUB_J":2 "DIAMOND_8":8 "HEART_3":3 "HEART_Q":2]`

### Parse Example

```go
``` 