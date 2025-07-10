<!-- markdownlint-disable MD033 -->
# 推播與解析實例


### 範例

1. golang amqp091 套件解析範例

完整範例 [Github](https://github.com/wecasino/wecasino-demo-backend-go/blob/main/queue/queue.go#L122)
	
根據 amqp delivery.Type 取得對應的通知類型, 根據類型使用proto 解析 body 格式 
遊戲回合卡牌(結果)的解析方式，另外在各遊戲章節補充解析

代碼參考：

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

2. 遊戲事件通知說明

    ### 該桌事件通知 (provider 解析)
    | GameNotifyType  | 說明 |
    |-----------------|------|
    | GameNotifyType_NOTIFY_GAME_PROVIDE_STATE_CHANGE | 桌狀態變更 |
    |GameNotifyType_NOTIFY_GAME_DEALER_LOGIN | 荷官登入 代碼名字相關 |
    |GameNotifyType_NOTIFY_GAME_DEALER_LOGOUT| 荷官登出 代碼名字相關|
    |GameNotifyType_NOTIFY_GAME_CHANGING_SHOE | 換靴 |
    |GameNotifyType_NOTIFY_GAME_CAPTURE| 荷官拍照使用的縮圖畫面 |


    ### 該桌班局事件通知 (ShiftRecord 解析)
    | GameNotifyType  | 說明 |
    |-----------------|------|
    |GameNotifyType_NOTIFY_SHIFT_START | 班次開始 |
    |GameNotifyType_NOTIFY_SHIFT_END | 班次結束 |

    ### 該桌班局事件通知 (ShoeRecord 解析)
    | GameNotifyType  | 說明 |
    |-----------------|------|
    |GameNotifyType_NOTIFY_SHOE_START | 靴號開始 |
    |GameNotifyType_NOTIFY_SHOE_END| 靴好結束 |

    ### 該局相關 (RoundRecord解析)		
    | GameNotifyType  | 說明 |
    |-----------------|------|
    |GameNotifyType_NOTIFY_ROUND_START | 通知遊戲開始（可用開始下注起始 可忽略）|
    |GameNotifyType_NOTIFY_ROUND_BET |通知遊戲開始下注 |
    |GameNotifyType_NOTIFY_ROUND_NO_MORE_BET| 通知遊戲停止下注|
    |GameNotifyType_NOTIFY_ROUND_STEP |通知遊戲該局歷程|
    |GameNotifyType_NOTIFY_ROUND_FINISH| 通知遊戲該局結果|
    |GameNotifyType_NOTIFY_ROUND_CANCEL| 通知遊戲該局取消|
    |GameNotifyType_NOTIFY_ROUND_PLAYBACK| 通知遊戲該局回放影像網址|
    |GameNotifyType_NOTIFY_ROUND_CANCEL_AFTER_ROUND| 事後該局取消結果|
    |GameNotifyType_NOTIFY_ROUND_MODIFY_AFTER_ROUND | 事後異動牌面結果|
    |GameNotifyType_NOTIFY_ROUND_FINISH_AFTER_ROUND| 透過後台輸入結果|

3. BA 牌面解析(SAMPLE)

    根據 GameNotifyType_NOTIFY_ROUND_STEP 事件解析 roundRecord 
來得到目前場上開了哪些牌型 參考使用座位與資源


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
    

4. BA 財神號碼說明

    roundRecord 屬性內有 FortuneRate 顯示卡牌對應倍率，於停止下注時公布，若場上有中對應牌神照遊戲規則賠率調整

    map[“CLUB_J”:2 “DIAMOND_8”:8 “HEART_3”:3 “HEART_Q”:2]

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