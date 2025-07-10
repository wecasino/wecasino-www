<!-- markdownlint-disable MD033 -->
# 龍虎鬥 (THEBIGBATTLE)

## 遊戲代碼

- GameType: `THEBIGBATTLE`
- 數值: 17

## 遊戲說明

龍虎資料格式，有靴，有左右手牌位置各1張，使用卡牌類型為撲克牌(POKERCARD)，當開玩家手牌後，會更新局資料內左右手牌位置(LEFT/RIGHT)的手上(HAND)卡牌。並透過資料推播接口，通知營運商。

## 龍虎子類型

| 卡牌 | 描述 |
|------|------|
| THEBIGBATTLE_CLASSIC | 經典龍虎 |
| THEBIGBATTLE_SPEED | 極速龍虎 |
| THEBIGBATTLE_BLOCKCHAIN | 區塊鏈龍虎 |
| THEBIGBATTLE_SPEED_BLOCKCHAIN | 區塊鏈極速龍虎 |

## 座位與資源配置

| 座位 | 資源 | 卡牌類型 | 描述 |
|------|------|----------|------|
| LEFT | HAND | POKERCARD | 本局結果，左:龍 以玩家視角為主 |
| RIGHT | HAND | POKERCARD | 本局結果，右:虎 以玩家視角為主 |

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

## 執行步驟

| 順序 | 步驟 | 描述 |
|------|------|------|
| 1 | ROUND_START | 本局開始<br/>標示本局開始 |
| 2 | DEAL_LEFT | 派發左側玩家手牌 |
| 3 | DEAL_RIGHT | 派發右側玩家手牌 |
| 4 | ROUND_BET | 開始下注<br/>Duration: 下注秒數<br/>ex Duration：45 = 45秒 |
| 5 | NO_MORE_BET | 停止下注<br/>Duration: 下注秒數<br/>ex Duration：45 = 45秒 |
| 6 | SHOW_LEFT | 開左側玩家手牌（取得開獎結果）<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD （目標遊戲為卡牌）<br/>• List: [&#123;Code: DIAMOND_5&#125;] （開鑽石5） |
| 7 | SHOW_RIGHT | 開右側玩家手牌（取得開獎結果）<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD （目標遊戲為卡牌）<br/>• List: [&#123;Code: SPADE_6&#125;] （開黑桃6） |
| 8 | ROUND_FINISHED | 本局結束<br/>標示本局結束 |
