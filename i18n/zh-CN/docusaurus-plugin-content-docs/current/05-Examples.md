<!-- markdownlint-disable MD033 -->
# 推送与解析实例

## 示例

### golang amqp091 套件解析示例

完整示例 [Github](https://github.com/wecasino/wecasino-demo-backend-go/blob/main/queue/queue.go#L122)

1. 根据 amqp delivery.Type 取得对应的通知类型，根据类型使用 proto 解析 body 格式
2. 游戏回合卡牌（结果）的解析方式，另外在各游戏章节补充解析

3. 代码参考：

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

### 游戏事件通知说明

1. 该桌事件通知（provider 解析）

    | GameNotifyType  | 说明 |
    |-----------------|------|
    | GameNotifyType_NOTIFY_GAME_PROVIDE_STATE_CHANGE | 桌状态变更 |
    |GameNotifyType_NOTIFY_GAME_DEALER_LOGIN | 荷官登入代码名字相关 |
    |GameNotifyType_NOTIFY_GAME_DEALER_LOGOUT| 荷官登出代码名字相关|
    |GameNotifyType_NOTIFY_GAME_CHANGING_SHOE | 换靴 |
    |GameNotifyType_NOTIFY_GAME_CAPTURE| 荷官拍照使用的缩图画面 |

2. 该桌班局事件通知（ShiftRecord 解析）

    | GameNotifyType  | 说明 |
    |-----------------|------|
    |GameNotifyType_NOTIFY_SHIFT_START | 班次开始 |
    |GameNotifyType_NOTIFY_SHIFT_END | 班次结束 |

3. 该桌班局事件通知（ShoeRecord 解析）

    | GameNotifyType  | 说明 |
    |-----------------|------|
    |GameNotifyType_NOTIFY_SHOE_START | 靴号开始 |
    |GameNotifyType_NOTIFY_SHOE_END| 靴号结束 |

4. 该局相关（RoundRecord 解析）

    | GameNotifyType  | 说明 |
    |-----------------|------|
    |GameNotifyType_NOTIFY_ROUND_START | 通知游戏开始（可用开始下注起始 可忽略）|
    |GameNotifyType_NOTIFY_ROUND_BET |通知游戏开始下注 |
    |GameNotifyType_NOTIFY_ROUND_NO_MORE_BET| 通知游戏停止下注|
    |GameNotifyType_NOTIFY_ROUND_STEP |通知游戏该局历程|
    |GameNotifyType_NOTIFY_ROUND_FINISH| 通知游戏该局结果|
    |GameNotifyType_NOTIFY_ROUND_CANCEL| 通知游戏该局取消|
    |GameNotifyType_NOTIFY_ROUND_PLAYBACK| 通知游戏该局回放视频网址|
    |GameNotifyType_NOTIFY_ROUND_CANCEL_AFTER_ROUND| 事后该局取消结果|
    |GameNotifyType_NOTIFY_ROUND_MODIFY_AFTER_ROUND | 事后异动牌面结果|
    |GameNotifyType_NOTIFY_ROUND_FINISH_AFTER_ROUND| 通过后台输入结果|

### BA 牌面解析（SAMPLE）

1. 根据 GameNotifyType_NOTIFY_ROUND_STEP 事件解析 roundRecord
来得到目前场上开了哪些牌型 参考使用座位与资源

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

### BA 财神号码说明

1. roundRecord 属性内有 FortuneRate 显示卡牌对应倍率，于停止下注时公布，若场上有中对应牌神照游戏规则赔率调整

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
