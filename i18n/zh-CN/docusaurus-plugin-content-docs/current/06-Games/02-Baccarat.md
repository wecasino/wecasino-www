<!-- markdownlint-disable MD033 -->
# 百家乐 (BACCARAT)

## 游戏代码

- GameType: `BACCARAT`
- 数值: 16

## 游戏说明

百家乐数据格式，有靴，有庄闲例牌补牌位置各4-6张，使用卡牌类型为扑克牌(POKERCARD)，当开玩家手牌后，会更新局数据内左庄闲Normal/Extra牌位置(BANKER/PLAYER)的手上卡牌，并通过数据推送接口，通知运营商。

## 百家乐子类型

| 子类型 | 描述 |
|--------|------|
| BACCARAT_CLASSIC | 经典百家乐 |
| BACCARAT_TRADITIONAL | 传统百家乐 |
| BACCARAT_SPEED | 极速百家乐 |
| BACCARAT_PEEK | 眯牌百家乐 |
| BACCARAT_FORTUNE | 财神百家乐 |
| BACCARAT_BLOCKCHAIN | 区块链百家乐 |
| BACCARAT_SPEED_BLOCKCHAIN | 区块链极速百家乐 |
| BACCARAT_PEEK_BLOCKCHAIN | 区块链眯牌百家乐 |

## 使用座位＆资源

| 座位 | 资源 | 描述 |
|------|------|------|
| pbGames.FlowSeat_PLAYER | pbBaccarat.ResourceType_NORMAL | 本局结果，闲家例牌 |
| pbGames.FlowSeat_PLAYER | pbBaccarat.ResourceType_EXTRA | 本局结果，闲家补牌 |
| pbGames.FlowSeat_BANKER | pbBaccarat.ResourceType_NORMAL | 本局结果，庄家例牌 |
| pbGames.FlowSeat_BANKER | pbBaccarat.ResourceType_EXTRA | 本局结果，庄家补牌 |

## 扑克牌专用卡牌

| 黑桃卡牌 | 红心卡牌 | 梅花卡牌 | 方块卡牌 | 描述 |
|----------|----------|----------|----------|------|
| SPADE_A | HEART_A | CLUB_A | DIAMOND_A | 1 点 |
| SPADE_2 | HEART_2 | CLUB_2 | DIAMOND_2 | 2 点 |
| SPADE_3 | HEART_3 | CLUB_3 | DIAMOND_3 | 3 点 |
| SPADE_4 | HEART_4 | CLUB_4 | DIAMOND_4 | 4 点 |
| SPADE_5 | HEART_5 | CLUB_5 | DIAMOND_5 | 5 点 |
| SPADE_6 | HEART_6 | CLUB_6 | DIAMOND_6 | 6 点 |
| SPADE_7 | HEART_7 | CLUB_7 | DIAMOND_7 | 7 点 |
| SPADE_8 | HEART_8 | CLUB_8 | DIAMOND_8 | 8 点 |
| SPADE_9 | HEART_9 | CLUB_9 | DIAMOND_9 | 9 点 |
| SPADE_10 | HEART_10 | CLUB_10 | DIAMOND_10 | 10 点 |
| SPADE_J | HEART_J | CLUB_J | DIAMOND_J | 11 点 |
| SPADE_Q | HEART_Q | CLUB_Q | DIAMOND_Q | 12 点 |
| SPADE_K | HEART_K | CLUB_K | DIAMOND_K | 13 点 |

## 执行步骤（经典、财神、急速、传统）

每经过一个step recorder.process会写入数据

| 顺序 | 步骤 | 描述 |
|------|------|------|
| 1 | Step_ROUND_START | 本局开始 (NOTIFY_ROUND_START) |
| 2 | Step_ROUND_BET | 开始下注(NOTIFY_ROUND_BET)<br/>Duration: 下注秒数<br/>ex Duration：45 = 45秒 |
| 3 | Step_NO_MORE_BET | 停止下注 (NOTIFY_ROUND_NO_MORE_BET)<br/>Duration: 下注秒数<br/>ex Duration：45 = 45秒 |
| 4 | Step_SHOW_PLAYER_1 | 开闲侧玩家手牌1 NOTIFY_ROUND_STEP（取得开牌结果） |
| 5 | Step_SHOW_BANKER_1 | 开庄侧玩家手牌1 NOTIFY_ROUND_STEP（取得开牌结果） |
| 6 | Step_SHOW_PLAYER_2 | 开闲侧玩家手牌2 NOTIFY_ROUND_STEP（取得开牌结果） |
| 7 | Step_SHOW_BANKER_2 | 开庄侧玩家手牌2 NOTIFY_ROUND_STEP（取得开牌结果） |
| 8 | Step_DEAL_PLAYER_EXTRA | 开闲侧玩家补牌 NOTIFY_ROUND_STEP（取得开牌结果） |
| 9 | Step_DEAL_BANKER_EXTRA | 开庄侧玩家补牌 NOTIFY_ROUND_STEP（取得开奖结果） |
| 10 | Step_DEALER_CONFIRM | 荷官确认结果阶段 NOTIFY_ROUND_STEP |
| 11 | Step_ROUND_FINISHED | 本局结束，发送 NOTIFY_ROUND_FINISH 通知结算 |

## 执行步骤（眯牌）

每经过一个step recorder.process会写入数据

| 顺序 | 步骤 | 描述 |
|------|------|------|
| 1 | Step_ROUND_START | 本局开始 (NOTIFY_ROUND_START) |
| 2 | Step_ROUND_BET | 开始下注 发送 NOTIFY_ROUND_BET 通知下注<br/>Duration: 下注秒数<br/>ex Duration：45 = 45秒 |
| 3 | Step_NO_MORE_BET | 停止下注 NOTIFY_ROUND_NO_MORE_BET 通知停止下注<br/>Duration: 下注秒数<br/>ex Duration：45 = 45秒 |
| 4 | Step_PEEK_NORMAL | 眯场上例牌 NOTIFY_ROUND_STEP（取得开牌结果）<br/>Duration: 眯牌时间 |
| 5 | Step_PEEK_SHOW_NORMAL | 开场上例牌 NOTIFY_ROUND_STEP（取得开牌结果） |
| 6 | Step_PEEK_DEAL_PLAYER_EXTRA | 眯闲家补牌 NOTIFY_ROUND_STEP（取得开牌结果）<br/>Duration: 眯牌时间 |
| 7 | Step_PEEK_SHOW_PLAYER_EXTRA | 开闲家补牌 NOTIFY_ROUND_STEP |
| 8 | Step_PEEK_DEAL_BANKER_EXTRA | 眯庄家补牌 NOTIFY_ROUND_STEP（取得开牌结果）<br/>Duration: 眯牌时间 |
| 9 | Step_PEEK_SHOW_BANKER_EXTRA | 开庄家补牌 NOTIFY_ROUND_STEP |
| 10 | Step_DEALER_CONFIRM | 荷官确认结果阶段 NOTIFY_ROUND_STEP |
| 11 | Step_ROUND_FINISHED | 本局结束，发送 NOTIFY_ROUND_FINISH 通知事件 |

## 执行步骤（电子类）

每经过一个step recorder.process会写入数据

| 顺序 | 步骤 | 描述 |
|------|------|------|
| 1 | Step_ROUND_START | 本局开始 (NOTIFY_ROUND_START) |
| 2 | Step_DEAL_PLAYER_1 | 派发闲家玩家手牌1 NOTIFY_ROUND_STEP（电子类预先发盖牌） |
| 3 | Step_DEAL_BANKER_1 | 派发庄家玩家手牌1 NOTIFY_ROUND_STEP（电子类预先发盖牌） |
| 4 | Step_DEAL_PLAYER_2 | 派发闲家玩家手牌2 NOTIFY_ROUND_STEP（电子类预先发盖牌） |
| 5 | Step_DEAL_BANKER_2 | 派发庄家玩家手牌2 NOTIFY_ROUND_STEP（电子类预先发盖牌） |
| 6 | Step_ROUND_BET | 开始下注 (NOTIFY_ROUND_BET)<br/>Duration: 下注秒数<br/>ex Duration：45 = 45秒 |
| 7 | Step_NO_MORE_BET | 停止下注(NOTIFY_ROUND_NO_MORE_BET)<br/>Duration: 下注秒数<br/>ex Duration：45 = 45秒 |
| 8 | Step_SHOW_PLAYER_1 | 开闲侧玩家手牌1 NOTIFY_ROUND_STEP（取得开牌结果） |
| 9 | Step_SHOW_BANKER_1 | 开庄侧玩家手牌1 NOTIFY_ROUND_STEP（取得开牌结果） |
| 10 | Step_SHOW_PLAYER_2 | 开闲侧玩家手牌2 NOTIFY_ROUND_STEP（取得开牌结果） |
| 11 | Step_SHOW_BANKER_2 | 开庄侧玩家手牌2 NOTIFY_ROUND_STEP（取得开牌结果） |
| 12 | Step_DEAL_PLAYER_EXTRA | 开闲侧玩家补牌 NOTIFY_ROUND_STEP（取得开牌结果） |
| 13 | Step_DEAL_BANKER_EXTRA | 开庄侧玩家补牌 NOTIFY_ROUND_STEP（取得开奖结果） |
| 14 | Step_DEALER_CONFIRM | 荷官确认结果阶段 NOTIFY_ROUND_STEP |
| 15 | Step_ROUND_FINISHED | 本局结束，发送 NOTIFY_ROUND_FINISH 通知结算 |

## 游戏事件通知

### 该桌事件通知 (provider 解析)

| 事件类型 | 描述 |
|----------|------|
| GameNotifyType_NOTIFY_GAME_PROVIDE_STATE_CHANGE | 桌状态变更 |
| GameNotifyType_NOTIFY_GAME_DEALER_LOGIN | 荷官登入 代码名字相关 |
| GameNotifyType_NOTIFY_GAME_DEALER_LOGOUT | 荷官登出 代码名字相关 |
| GameNotifyType_NOTIFY_GAME_CHANGING_SHOE | 换靴 |
| GameNotifyType_NOTIFY_GAME_CAPTURE | 荷官拍照使用的缩图画面 |

### 该桌班局事件通知 (ShiftRecord 解析)

| 事件类型 | 描述 |
|----------|------|
| GameNotifyType_NOTIFY_SHIFT_START | 班次开始 |
| GameNotifyType_NOTIFY_SHIFT_END | 班次结束 |

### 该桌班局事件通知 (ShoeRecord 解析)

| 事件类型 | 描述 |
|----------|------|
| GameNotifyType_NOTIFY_SHOE_START | 靴号开始 |
| GameNotifyType_NOTIFY_SHOE_END | 靴号结束 |

### 该局相关 (RoundRecord解析)

| 事件类型 | 描述 |
|----------|------|
| GameNotifyType_NOTIFY_ROUND_START | 通知游戏开始（可用开始下注起始 可忽略） |
| GameNotifyType_NOTIFY_ROUND_BET | 通知游戏开始下注 |
| GameNotifyType_NOTIFY_ROUND_NO_MORE_BET | 通知游戏停止下注 |
| GameNotifyType_NOTIFY_ROUND_STEP | 通知游戏该局历程 |
| GameNotifyType_NOTIFY_ROUND_FINISH | 通知游戏该局结果 |
| GameNotifyType_NOTIFY_ROUND_CANCEL | 通知游戏该局取消 |
| GameNotifyType_NOTIFY_ROUND_PLAYBACK | 通知游戏该局回放影像网址 |
| GameNotifyType_NOTIFY_ROUND_CANCEL_AFTER_ROUND | 事后该局取消结果 |
| GameNotifyType_NOTIFY_ROUND_MODIFY_AFTER_ROUND | 事后异动牌面结果 |
| GameNotifyType_NOTIFY_ROUND_FINISH_AFTER_ROUND | 通过后台输入结果 |

## 解析牌面示例

根据 GameNotifyType_NOTIFY_ROUND_STEP 事件解析 roundRecord 来得到目前场上开了哪些牌型

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

## 财神号码说明

roundRecord 属性内有 FortuneRate 显示卡牌对应倍率，于停止下注时公布，若场上有中对应牌神照游戏规则赔率调整。

示例：`map["CLUB_J":2 "DIAMOND_8":8 "HEART_3":3 "HEART_Q":2]`

### 解析示例

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
