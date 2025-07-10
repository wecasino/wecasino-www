<!-- markdownlint-disable MD033 -->
# 骰寶 (SICBO)

## 遊戲代碼

- GameType: `SICBO`
- 數值: 32

## 遊戲說明

骰寶資料格式，沒有靴，只有一個主播荷官位置，使用卡牌類型為骰寶專用卡DICE，當骰寶擲骰後，會更新局資料內荷官位置(DEALER)的場上(FIELD)卡牌。並透過資料推播接口，通知營運商。

## 骰寶子類型

| 卡牌 | 描述 |
|------|------|
| SICBO_CLASSIC | 經典骰寶 |
| SICBO_FORTUNE | 財神骰寶 |
| SICBO_BLOCKCHAIN | 區塊鏈骰寶 |

## 座位與資源配置

| 座位 | 資源 | 卡牌類型 | 描述 |
|------|------|----------|------|
| DEALER | FIELD | DICE | 本局結果 |

## 骰寶專用卡牌

| 卡牌 | 描述 |
|------|------|
| DICE_1 | 1 點 |
| DICE_2 | 2 點 |
| DICE_3 | 3 點 |
| DICE_4 | 4 點 |
| DICE_5 | 5 點 |
| DICE_6 | 6 點 |

## 執行步驟

| 順序 | 步驟 | 描述 |
|------|------|------|
| 1 | ROUND_START | 本局開始<br/>標示本局開始 |
| 2 | ROUND_BET | 開始下注<br/>Duration: 下注秒數<br/>ex Duration：45 = 45秒 |
| 3 | NO_MORE_BET | 停止下注<br/>Duration: 下注秒數<br/>ex Duration：45 = 45秒 |
| 4 | THROW_DICE | 擲骰（取得開獎結果）<br/>Action:<br/>Cards:<br/>• CardType: DICE （目標遊戲為骰寶）<br/>• List: [&#123;Code: DICE_2-DICE_3-DICE_5&#125;] （開2，3，5點數） |
| 5 | ROUND_FINISHED | 本局結束<br/>標示本局結束 |
