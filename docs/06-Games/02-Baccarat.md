<!-- markdownlint-disable MD033 -->
# 百家樂 (BACCARAT)

## 遊戲代碼

- GameType: `BACCARAT`
- 數值: 16

## 遊戲說明

百家樂資料格式，有靴，有莊閒例牌補牌位置各4-6張，使用卡牌類型為撲克牌(POKERCARD)，當開玩家手牌後，會更新局資料內左莊閒Normal/Extra牌位置(BANKER/PLAYER)的手上卡牌，並透過資料推播接口，通知營運商。

## 百家樂子類型

| 子類型 | 描述 |
|--------|------|
| BACCARAT_CLASSIC | 經典百家樂 |
| BACCARAT_TRADITIONAL | 傳統百家樂 |
| BACCARAT_SPEED | 極速百家樂 |
| BACCARAT_PEEK | 瞇牌百家樂 |
| BACCARAT_FORTUNE | 財神百家樂 |
| BACCARAT_BLOCKCHAIN | 區塊鏈百家樂 |
| BACCARAT_SPEED_BLOCKCHAIN | 區塊鏈極速百家樂 |
| BACCARAT_PEEK_BLOCKCHAIN | 區塊鏈瞇牌百家樂 |

## 使用座位＆資源

| 座位 | 資源 | 描述 |
|------|------|------|
| pbGames.FlowSeat_PLAYER | pbBaccarat.ResourceType_NORMAL | 本局結果，閒家例牌 |
| pbGames.FlowSeat_PLAYER | pbBaccarat.ResourceType_EXTRA | 本局結果，閒家補牌 |
| pbGames.FlowSeat_BANKER | pbBaccarat.ResourceType_NORMAL | 本局結果，莊家例牌 |
| pbGames.FlowSeat_BANKER | pbBaccarat.ResourceType_EXTRA | 本局結果，莊家補牌 |

## 撲克牌專用卡牌

| 黑桃卡牌 | 愛心卡牌 | 梅花卡牌 | 鑽石卡牌 | 描述 |
|----------|----------|----------|----------|------|
| SPADE_A | HEART_A | CLUB_A | DIAMOND_A | 1 點 |
| SPADE_2 | HEART_2 | CLUB_2 | DIAMOND_2 | 2 點 |
| SPADE_3 | HEART_3 | CLUB_3 | DIAMOND_3 | 3 點 |
| SPADE_4 | HEART_4 | CLUB_4 | DIAMOND_4 | 4 點 |
| SPADE_5 | HEART_5 | CLUB_5 | DIAMOND_5 | 5 點 |
| SPADE_6 | HEART_6 | CLUB_6 | DIAMOND_6 | 6 點 |
| SPADE_7 | HEART_7 | CLUB_7 | DIAMOND_7 | 7 點 |
| SPADE_8 | HEART_8 | CLUB_8 | DIAMOND_8 | 8 點 |
| SPADE_9 | HEART_9 | CLUB_9 | DIAMOND_9 | 9 點 |
| SPADE_10 | HEART_10 | CLUB_10 | DIAMOND_10 | 10 點 |
| SPADE_J | HEART_J | CLUB_J | DIAMOND_J | 11 點 |
| SPADE_Q | HEART_Q | CLUB_Q | DIAMOND_Q | 12 點 |
| SPADE_K | HEART_K | CLUB_K | DIAMOND_K | 13 點 |

## 執行步驟（經典、財神、急速、傳統）

每經過一個step recorder.process會寫入資料

| 順序 | 步驟 | 描述 |
|------|------|------|
| 1 | Step_ROUND_START | 本局開始 (NOTIFY_ROUND_START) |
| 2 | Step_ROUND_BET | 開始下注(NOTIFY_ROUND_BET)<br/>Duration: 下注秒數<br/>ex Duration：45 = 45秒 |
| 3 | Step_NO_MORE_BET | 停止下注 (NOTIFY_ROUND_NO_MORE_BET)<br/>Duration: 下注秒數<br/>ex Duration：45 = 45秒 |
| 4 | Step_SHOW_PLAYER_1 | 開閒側玩家手牌1 NOTIFY_ROUND_STEP（取得開牌結果） |
| 5 | Step_SHOW_BANKER_1 | 開莊側玩家手牌1 NOTIFY_ROUND_STEP（取得開牌結果） |
| 6 | Step_SHOW_PLAYER_2 | 開閒側玩家手牌2 NOTIFY_ROUND_STEP（取得開牌結果） |
| 7 | Step_SHOW_BANKER_2 | 開莊側玩家手牌2 NOTIFY_ROUND_STEP（取得開牌結果） |
| 8 | Step_DEAL_PLAYER_EXTRA | 開閒側玩家補牌 NOTIFY_ROUND_STEP（取得開牌結果） |
| 9 | Step_DEAL_BANKER_EXTRA | 開莊側玩家補牌 NOTIFY_ROUND_STEP（取得開獎結果） |
| 10 | Step_DEALER_CONFIRM | 荷官確認結果階段 NOTIFY_ROUND_STEP |
| 11 | Step_ROUND_FINISHED | 本局結束，發送 NOTIFY_ROUND_FINISH 通知結算 |

## 執行步驟（瞇牌）

每經過一個step recorder.process會寫入資料

| 順序 | 步驟 | 描述 |
|------|------|------|
| 1 | Step_ROUND_START | 本局開始 (NOTIFY_ROUND_START) |
| 2 | Step_ROUND_BET | 開始下注 發送 NOTIFY_ROUND_BET 通知下注<br/>Duration: 下注秒數<br/>ex Duration：45 = 45秒 |
| 3 | Step_NO_MORE_BET | 停止下注 NOTIFY_ROUND_NO_MORE_BET 通知停止下注<br/>Duration: 下注秒數<br/>ex Duration：45 = 45秒 |
| 4 | Step_PEEK_NORMAL | 瞇場上例牌 NOTIFY_ROUND_STEP（取得開牌結果）<br/>Duration: 瞇牌時間 |
| 5 | Step_PEEK_SHOW_NORMAL | 開場上例牌 NOTIFY_ROUND_STEP（取得開牌結果） |
| 6 | Step_PEEK_DEAL_PLAYER_EXTRA | 瞇閒家補牌 NOTIFY_ROUND_STEP（取得開牌結果）<br/>Duration: 瞇牌時間 |
| 7 | Step_PEEK_SHOW_PLAYER_EXTRA | 開嫌家補牌 NOTIFY_ROUND_STEP |
| 8 | Step_PEEK_DEAL_BANKER_EXTRA | 瞇莊家補牌 NOTIFY_ROUND_STEP（取得開牌結果）<br/>Duration: 瞇牌時間 |
| 9 | Step_PEEK_SHOW_BANKER_EXTRA | 開莊家補牌 NOTIFY_ROUND_STEP |
| 10 | Step_DEALER_CONFIRM | 荷官確認結果階段 NOTIFY_ROUND_STEP |
| 11 | Step_ROUND_FINISHED | 本局結束，發送 NOTIFY_ROUND_FINISH 通知事件 |

## 執行步驟（電子類）

每經過一個step recorder.process會寫入資料

| 順序 | 步驟 | 描述 |
|------|------|------|
| 1 | Step_ROUND_START | 本局開始 (NOTIFY_ROUND_START) |
| 2 | Step_DEAL_PLAYER_1 | 派發閒家玩家手牌1 NOTIFY_ROUND_STEP（電子類預先發蓋牌） |
| 3 | Step_DEAL_BANKER_1 | 派發莊家玩家手牌1 NOTIFY_ROUND_STEP（電子類預先發蓋牌） |
| 4 | Step_DEAL_PLAYER_2 | 派發閒家玩家手牌2 NOTIFY_ROUND_STEP（電子類預先發蓋牌） |
| 5 | Step_DEAL_BANKER_2 | 派發莊家玩家手牌2 NOTIFY_ROUND_STEP（電子類預先發蓋牌） |
| 6 | Step_ROUND_BET | 開始下注 (NOTIFY_ROUND_BET)<br/>Duration: 下注秒數<br/>ex Duration：45 = 45秒 |
| 7 | Step_NO_MORE_BET | 停止下注(NOTIFY_ROUND_NO_MORE_BET)<br/>Duration: 下注秒數<br/>ex Duration：45 = 45秒 |
| 8 | Step_SHOW_PLAYER_1 | 開閒側玩家手牌1 NOTIFY_ROUND_STEP（取得開牌結果） |
| 9 | Step_SHOW_BANKER_1 | 開莊側玩家手牌1 NOTIFY_ROUND_STEP（取得開牌結果） |
| 10 | Step_SHOW_PLAYER_2 | 開閒側玩家手牌2 NOTIFY_ROUND_STEP（取得開牌結果） |
| 11 | Step_SHOW_BANKER_2 | 開莊側玩家手牌2 NOTIFY_ROUND_STEP（取得開牌結果） |
| 12 | Step_DEAL_PLAYER_EXTRA | 開閒側玩家補牌 NOTIFY_ROUND_STEP（取得開牌結果） |
| 13 | Step_DEAL_BANKER_EXTRA | 開莊側玩家補牌 NOTIFY_ROUND_STEP（取得開獎結果） |
| 14 | Step_DEALER_CONFIRM | 荷官確認結果階段 NOTIFY_ROUND_STEP |
| 15 | Step_ROUND_FINISHED | 本局結束，發送 NOTIFY_ROUND_FINISH 通知結算 |

## 遊戲事件通知

### 該桌事件通知 (provider 解析)

| 事件類型 | 描述 |
|----------|------|
| GameNotifyType_NOTIFY_GAME_PROVIDE_STATE_CHANGE | 桌狀態變更 |
| GameNotifyType_NOTIFY_GAME_DEALER_LOGIN | 荷官登入 代碼名字相關 |
| GameNotifyType_NOTIFY_GAME_DEALER_LOGOUT | 荷官登出 代碼名字相關 |
| GameNotifyType_NOTIFY_GAME_CHANGING_SHOE | 換靴 |
| GameNotifyType_NOTIFY_GAME_CAPTURE | 荷官拍照使用的縮圖畫面 |

### 該桌班局事件通知 (ShiftRecord 解析)

| 事件類型 | 描述 |
|----------|------|
| GameNotifyType_NOTIFY_SHIFT_START | 班次開始 |
| GameNotifyType_NOTIFY_SHIFT_END | 班次結束 |

### 該桌班局事件通知 (ShoeRecord 解析)

| 事件類型 | 描述 |
|----------|------|
| GameNotifyType_NOTIFY_SHOE_START | 靴號開始 |
| GameNotifyType_NOTIFY_SHOE_END | 靴好結束 |

### 該局相關 (RoundRecord解析)

| 事件類型 | 描述 |
|----------|------|
| GameNotifyType_NOTIFY_ROUND_START | 通知遊戲開始（可用開始下注起始 可忽略） |
| GameNotifyType_NOTIFY_ROUND_BET | 通知遊戲開始下注 |
| GameNotifyType_NOTIFY_ROUND_NO_MORE_BET | 通知遊戲停止下注 |
| GameNotifyType_NOTIFY_ROUND_STEP | 通知遊戲該局歷程 |
| GameNotifyType_NOTIFY_ROUND_FINISH | 通知遊戲該局結果 |
| GameNotifyType_NOTIFY_ROUND_CANCEL | 通知遊戲該局取消 |
| GameNotifyType_NOTIFY_ROUND_PLAYBACK | 通知遊戲該局回放影像網址 |
| GameNotifyType_NOTIFY_ROUND_CANCEL_AFTER_ROUND | 事後該局取消結果 |
| GameNotifyType_NOTIFY_ROUND_MODIFY_AFTER_ROUND | 事後異動牌面結果 |
| GameNotifyType_NOTIFY_ROUND_FINISH_AFTER_ROUND | 透過後台輸入結果 |

## 解析牌面範例

根據 GameNotifyType_NOTIFY_ROUND_STEP 事件解析 roundRecord 來得到目前場上開了哪些牌型

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

## 財神號碼說明

roundRecord 屬性內有 FortuneRate 顯示卡牌對應倍率，於停止下注時公布，若場上有中對應牌神照遊戲規則賠率調整。

範例：`map["CLUB_J":2 "DIAMOND_8":8 "HEART_3":3 "HEART_Q":2]`

### 解析範例

```go
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
