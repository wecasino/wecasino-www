<!-- markdownlint-disable MD033 -->
# Baccarat (BACCARAT)

## Game Code

- GameType: `BACCARAT`
- Value: 16

## Game Description

Baccarat data format, has shoe, has banker and player card positions with 4-6 cards each. Uses poker card type (POKERCARD). After dealing player cards, updates round data's banker/player Normal/Extra card positions (BANKER/PLAYER) hand cards, and notifies operators through data push interface.

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

## Seats & Resources Used

| Seat | Resource | Description |
|------|----------|-------------|
| pbGames.FlowSeat_PLAYER | pbBaccarat.ResourceType_NORMAL | Round result, player natural cards |
| pbGames.FlowSeat_PLAYER | pbBaccarat.ResourceType_EXTRA | Round result, player third card |
| pbGames.FlowSeat_BANKER | pbBaccarat.ResourceType_NORMAL | Round result, banker natural cards |
| pbGames.FlowSeat_BANKER | pbBaccarat.ResourceType_EXTRA | Round result, banker third card |

## Poker Cards

| Spade Cards | Heart Cards | Club Cards | Diamond Cards | Description |
|-------------|-------------|------------|---------------|-------------|
| SPADE_A | HEART_A | CLUB_A | DIAMOND_A | 1 Point |
| SPADE_2 | HEART_2 | CLUB_2 | DIAMOND_2 | 2 Points |
| SPADE_3 | HEART_3 | CLUB_3 | DIAMOND_3 | 3 Points |
| SPADE_4 | HEART_4 | CLUB_4 | DIAMOND_4 | 4 Points |
| SPADE_5 | HEART_5 | CLUB_5 | DIAMOND_5 | 5 Points |
| SPADE_6 | HEART_6 | CLUB_6 | DIAMOND_6 | 6 Points |
| SPADE_7 | HEART_7 | CLUB_7 | DIAMOND_7 | 7 Points |
| SPADE_8 | HEART_8 | CLUB_8 | DIAMOND_8 | 8 Points |
| SPADE_9 | HEART_9 | CLUB_9 | DIAMOND_9 | 9 Points |
| SPADE_10 | HEART_10 | CLUB_10 | DIAMOND_10 | 10 Points |
| SPADE_J | HEART_J | CLUB_J | DIAMOND_J | 11 Points |
| SPADE_Q | HEART_Q | CLUB_Q | DIAMOND_Q | 12 Points |
| SPADE_K | HEART_K | CLUB_K | DIAMOND_K | 13 Points |

## Execution Steps (Classic, Fortune, Speed, Traditional)

Each step writes data to recorder.process

| Order | Step | Description |
|-------|------|-------------|
| 1 | Step_ROUND_START | Round start (NOTIFY_ROUND_START) |
| 2 | Step_ROUND_BET | Start betting (NOTIFY_ROUND_BET)<br>Duration: betting seconds<br>ex Duration: 45 = 45 seconds |
| 3 | Step_NO_MORE_BET | Stop betting (NOTIFY_ROUND_NO_MORE_BET)<br>Duration: betting seconds<br>ex Duration: 45 = 45 seconds |
| 4 | Step_SHOW_PLAYER_1 | Show player side card 1 NOTIFY_ROUND_STEP (get card result) |
| 5 | Step_SHOW_BANKER_1 | Show banker side card 1 NOTIFY_ROUND_STEP (get card result) |
| 6 | Step_SHOW_PLAYER_2 | Show player side card 2 NOTIFY_ROUND_STEP (get card result) |
| 7 | Step_SHOW_BANKER_2 | Show banker side card 2 NOTIFY_ROUND_STEP (get card result) |
| 8 | Step_DEAL_PLAYER_EXTRA | Deal player third card NOTIFY_ROUND_STEP (get card result) |
| 9 | Step_DEAL_BANKER_EXTRA | Deal banker third card NOTIFY_ROUND_STEP (get result) |
| 10 | Step_DEALER_CONFIRM | Dealer confirm result phase NOTIFY_ROUND_STEP |
| 11 | Step_ROUND_FINISHED | Round end, send NOTIFY_ROUND_FINISH for settlement |

## Execution Steps (Peek)

Each step writes data to recorder.process

| Order | Step | Description |
|-------|------|-------------|
| 1 | Step_ROUND_START | Round start (NOTIFY_ROUND_START) |
| 2 | Step_ROUND_BET | Start betting send NOTIFY_ROUND_BET<br>Duration: betting seconds<br>ex Duration: 45 = 45 seconds |
| 3 | Step_NO_MORE_BET | Stop betting NOTIFY_ROUND_NO_MORE_BET<br>Duration: betting seconds<br>ex Duration: 45 = 45 seconds |
| 4 | Step_PEEK_NORMAL | Peek natural cards NOTIFY_ROUND_STEP (get card result)<br>Duration: peek time |
| 5 | Step_PEEK_SHOW_NORMAL | Show natural cards NOTIFY_ROUND_STEP (get card result) |
| 6 | Step_PEEK_DEAL_PLAYER_EXTRA | Peek player third card NOTIFY_ROUND_STEP (get card result)<br>Duration: peek time |
| 7 | Step_PEEK_SHOW_PLAYER_EXTRA | Show player third card NOTIFY_ROUND_STEP |
| 8 | Step_PEEK_DEAL_BANKER_EXTRA | Peek banker third card NOTIFY_ROUND_STEP (get card result)<br>Duration: peek time |
| 9 | Step_PEEK_SHOW_BANKER_EXTRA | Show banker third card NOTIFY_ROUND_STEP |
| 10 | Step_DEALER_CONFIRM | Dealer confirm result phase NOTIFY_ROUND_STEP |
| 11 | Step_ROUND_FINISHED | Round end, send NOTIFY_ROUND_FINISH event |

## Execution Steps (Electronic)

Each step writes data to recorder.process

| Order | Step | Description |
|-------|------|-------------|
| 1 | Step_ROUND_START | Round start (NOTIFY_ROUND_START) |
| 2 | Step_DEAL_PLAYER_1 | Deal player card 1 NOTIFY_ROUND_STEP (electronic pre-deal face down) |
| 3 | Step_DEAL_BANKER_1 | Deal banker card 1 NOTIFY_ROUND_STEP (electronic pre-deal face down) |
| 4 | Step_DEAL_PLAYER_2 | Deal player card 2 NOTIFY_ROUND_STEP (electronic pre-deal face down) |
| 5 | Step_DEAL_BANKER_2 | Deal banker card 2 NOTIFY_ROUND_STEP (electronic pre-deal face down) |
| 6 | Step_ROUND_BET | Start betting (NOTIFY_ROUND_BET)<br>Duration: betting seconds<br>ex Duration: 45 = 45 seconds |
| 7 | Step_NO_MORE_BET | Stop betting (NOTIFY_ROUND_NO_MORE_BET)<br>Duration: betting seconds<br>ex Duration: 45 = 45 seconds |
| 8 | Step_SHOW_PLAYER_1 | Show player card 1 NOTIFY_ROUND_STEP (get card result) |
| 9 | Step_SHOW_BANKER_1 | Show banker card 1 NOTIFY_ROUND_STEP (get card result) |
| 10 | Step_SHOW_PLAYER_2 | Show player card 2 NOTIFY_ROUND_STEP (get card result) |
| 11 | Step_SHOW_BANKER_2 | Show banker card 2 NOTIFY_ROUND_STEP (get card result) |
| 12 | Step_DEAL_PLAYER_EXTRA | Show player third card NOTIFY_ROUND_STEP (get card result) |
| 13 | Step_DEAL_BANKER_EXTRA | Show banker third card NOTIFY_ROUND_STEP (get result) |
| 14 | Step_DEALER_CONFIRM | Dealer confirm result phase NOTIFY_ROUND_STEP |
| 15 | Step_ROUND_FINISHED | Round end, send NOTIFY_ROUND_FINISH for settlement |

## Game Event Notifications

### Table Event Notifications (provider parsing)

| Event Type | Description |
|------------|-------------|
| GameNotifyType_NOTIFY_GAME_PROVIDE_STATE_CHANGE | Table state change |
| GameNotifyType_NOTIFY_GAME_DEALER_LOGIN | Dealer login, code and name related |
| GameNotifyType_NOTIFY_GAME_DEALER_LOGOUT | Dealer logout, code and name related |
| GameNotifyType_NOTIFY_GAME_CHANGING_SHOE | Shoe change |
| GameNotifyType_NOTIFY_GAME_CAPTURE | Dealer thumbnail image |

### Table Shift Event Notifications (ShiftRecord parsing)

| Event Type | Description |
|------------|-------------|
| GameNotifyType_NOTIFY_SHIFT_START | Shift start |
| GameNotifyType_NOTIFY_SHIFT_END | Shift end |

### Table Shoe Event Notifications (ShoeRecord parsing)

| Event Type | Description |
|------------|-------------|
| GameNotifyType_NOTIFY_SHOE_START | Shoe start |
| GameNotifyType_NOTIFY_SHOE_END | Shoe end |

### Round Related (RoundRecord parsing)

| Event Type | Description |
|------------|-------------|
| GameNotifyType_NOTIFY_ROUND_START | Notify game start (can use as betting start, may ignore) |
| GameNotifyType_NOTIFY_ROUND_BET | Notify game betting start |
| GameNotifyType_NOTIFY_ROUND_NO_MORE_BET | Notify game betting stop |
| GameNotifyType_NOTIFY_ROUND_STEP | Notify game round process |
| GameNotifyType_NOTIFY_ROUND_FINISH | Notify game round result |
| GameNotifyType_NOTIFY_ROUND_CANCEL | Notify game round cancel |
| GameNotifyType_NOTIFY_ROUND_PLAYBACK | Notify game round playback video URL |
| GameNotifyType_NOTIFY_ROUND_CANCEL_AFTER_ROUND | Cancel round result afterward |
| GameNotifyType_NOTIFY_ROUND_MODIFY_AFTER_ROUND | Modify card result afterward |
| GameNotifyType_NOTIFY_ROUND_FINISH_AFTER_ROUND | Backend input result |

## Card Parsing Example

Parse roundRecord based on GameNotifyType_NOTIFY_ROUND_STEP event to get current cards on the table

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

roundRecord property contains FortuneRate showing card corresponding multipliers, announced when betting stops. If corresponding fortune cards appear on table, payout is adjusted according to game rules.

Example: `map["CLUB_J":2 "DIAMOND_8":8 "HEART_3":3 "HEART_Q":2]`

### Parsing Example

```go
func ParseRoundLucky(ctx context.Context, round *pbRecorder.RoundRecord) map[uint8]uint16 {
    // Fortune parsing logic here
    return fortuneMap
}
``` 