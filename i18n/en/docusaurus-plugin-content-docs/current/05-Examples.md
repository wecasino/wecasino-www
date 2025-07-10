<!-- markdownlint-disable MD033 -->
# Push and Parse Examples

## Examples

### golang amqp091 Package Parsing Example

Complete example [Github](https://github.com/wecasino/wecasino-demo-backend-go/blob/main/queue/queue.go#L122)

1. Get the corresponding notification type based on amqp delivery.Type, and use proto to parse body format according to the type
2. The parsing method for game round cards (results) is supplemented in each game chapter

3. Code reference:

    [Github](https://github.com/wecasino/wecasino-demo-backend-go) (GOLANG)

    [Github](https://github.com/wecasino/wecasino-demo-java) (JAVA)

    ``` go
    func(delivery amqp091.Delivery) {
      notifyType := pbRecorder.GameNotifyType(pbRecorder.GameNotifyType_value[delivery.Type])


          logrus.Infof("receive game notifyType:[%v]", notifyType)
          switch notifyType {
          case pbRecorder.GameNotifyType_NOTIFY_GAME_DEALER_LOGIN,
              pbRecorder.GameNotifyType_NOTIFY_GAME_DEALER_LOGOUT,
              pbRecorder.GameNotifyType_NOTIFY_GAME_CHANGING_SHOE:
              gameProvide := &pbRecorder.GameProvide{}
              err := proto.Unmarshal(delivery.Body, gameProvide)
              …
          case pbRecorder.GameNotifyType_NOTIFY_SHIFT_START,
              pbRecorder.GameNotifyType_NOTIFY_SHIFT_END:
              shift := &pbRecorder.ShiftRecord{}
              err := proto.Unmarshal(delivery.Body, shift)
              …
          case pbRecorder.GameNotifyType_NOTIFY_SHOE_START,
              pbRecorder.GameNotifyType_NOTIFY_SHOE_END:
              shoe := &pbRecorder.ShoeRecord{}
              err := proto.Unmarshal(delivery.Body, shoe)
              …
          case pbRecorder.GameNotifyType_NOTIFY_ROUND_START,
              pbRecorder.GameNotifyType_NOTIFY_ROUND_BET,
              pbRecorder.GameNotifyType_NOTIFY_ROUND_NO_MORE_BET,
              pbRecorder.GameNotifyType_NOTIFY_ROUND_STEP,
              pbRecorder.GameNotifyType_NOTIFY_ROUND_FINISH,
              pbRecorder.GameNotifyType_NOTIFY_ROUND_CANCEL,
              pbRecorder.GameNotifyType_NOTIFY_ROUND_PLAYBACK:
              round := &pbRecorder.RoundRecord{}
              err := proto.Unmarshal(delivery.Body, round)

              ...

    ```

### Game Event Notification Description

1. Table event notification (provider parsing)

    | GameNotifyType  | Description |
    |-----------------|-------------|
    | GameNotifyType_NOTIFY_GAME_PROVIDE_STATE_CHANGE | Table status change |
    |GameNotifyType_NOTIFY_GAME_DEALER_LOGIN | Dealer login code name related |
    |GameNotifyType_NOTIFY_GAME_DEALER_LOGOUT| Dealer logout code name related|
    |GameNotifyType_NOTIFY_GAME_CHANGING_SHOE | Change shoe |
    |GameNotifyType_NOTIFY_GAME_CAPTURE| Dealer photo thumbnail screen |

2. Table shift event notification (ShiftRecord parsing)

    | GameNotifyType  | Description |
    |-----------------|-------------|
    |GameNotifyType_NOTIFY_SHIFT_START | Shift start |
    |GameNotifyType_NOTIFY_SHIFT_END | Shift end |

3. Table shoe event notification (ShoeRecord parsing)

    | GameNotifyType  | Description |
    |-----------------|-------------|
    |GameNotifyType_NOTIFY_SHOE_START | Shoe number start |
    |GameNotifyType_NOTIFY_SHOE_END| Shoe number end |

4. Round related (RoundRecord parsing)

    | GameNotifyType  | Description |
    |-----------------|-------------|
    |GameNotifyType_NOTIFY_ROUND_START | Notify game start (can be used as betting start, can be ignored)|
    |GameNotifyType_NOTIFY_ROUND_BET |Notify game betting start |
    |GameNotifyType_NOTIFY_ROUND_NO_MORE_BET| Notify game stop betting|
    |GameNotifyType_NOTIFY_ROUND_STEP |Notify game round history|
    |GameNotifyType_NOTIFY_ROUND_FINISH| Notify game round result|
    |GameNotifyType_NOTIFY_ROUND_CANCEL| Notify game round cancellation|
    |GameNotifyType_NOTIFY_ROUND_PLAYBACK| Notify game round replay video URL|
    |GameNotifyType_NOTIFY_ROUND_CANCEL_AFTER_ROUND| Post-round cancellation result|
    |GameNotifyType_NOTIFY_ROUND_MODIFY_AFTER_ROUND | Post-round card face modification result|
    |GameNotifyType_NOTIFY_ROUND_FINISH_AFTER_ROUND| Result input through backend|

### BA Card Face Parsing (SAMPLE)

1. Parse roundRecord according to GameNotifyType_NOTIFY_ROUND_STEP event
to get which card types are currently on the field, refer to seat and resource usage

    ``` go
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

### BA Fortune Number Description

1. The FortuneRate in roundRecord attributes shows the card corresponding multiplier, announced at stop betting, if there is a corresponding fortune card on the field, the odds are adjusted according to game rules

2. map["CLUB_J":2 "DIAMOND_8":8 "HEART_3":3 "HEART_Q":2]

    ``` go
    func ParseRoundLucky(ctx context.Context, round *pbRecorder.RoundRecord) map[uint8]uint16 {
    roundLuckyMap := map[uint8]uint16{}
    for cardCode, rate := range round.FortuneRates {
        poker, err := cards.ParsePokerCode(cardCode)
        if err == nil {
            roundLuckyMap[poker] = uint16(rate)
        }
    }
    return roundLuckyMap
    }
    ```
