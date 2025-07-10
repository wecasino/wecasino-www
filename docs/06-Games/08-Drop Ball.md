<!-- markdownlint-disable MD033 -->

# 幸運球 (DROPBALL)

## 遊戲代碼

- GameType: `DROPBALL`
- 數值: 34

## 遊戲說明

幸運球資料格式，沒有靴，只有一個主播荷官位置，使用卡牌類型為撲克牌(POKERCARD)，當幸運球擲骰後，會更新局資料內荷官位置(DEALER)
的場上(FIELD)卡牌。並透過資料推播接口，通知營運商。

幸運球子類型為幸運球 JACKPOT 模式時，且三個球相同時，進入幸運球 JACKPOT 模式。
幸運球 JACKPOT 模式，沒有靴，只有一個主播荷官位置，使用卡牌類型為幸運輪(WHEEL)，當幸運輪轉動完，會更新局資料內荷官位置(
DEALER)
的場上(WHEEL)卡牌。並透過資料推播接口，通知營運商。

## 幸運球子類型

| 卡牌                    | 描述              |
|-----------------------|-----------------|
| DROPBALL_CLASSIC      | 經典幸運球           |
| DROPBALL_COCONUT_BALL | 椰子球             |
| DROPBALL_JACKPOT      | 幸運球  JACKPOT 模式 |
| DROPBALL_BLOCKCHAIN   | 區塊鏈幸運球          |

## 座位與資源配置

| 座位     | 資源          | 卡牌類型  | 描述                |
|--------|-------------|-------|-------------------|
| DEALER | FIELD       | POKER | 本局結果              |
| DEALER | LUCKY_WHEEL | WHEEL | 幸運球 JACKPOT 子類型結果 |

## 撲克牌專用卡牌

| 黑桃卡牌     | 愛心卡牌     | 梅花卡牌    | 鑽石卡牌       | 描述   |
|----------|----------|---------|------------|------|
| SPADE_A  | HEART_A  | CLUB_A  | DIAMOND_A  | 1 點  |
| SPADE_2  | HEART_2  | CLUB_2  | DIAMOND_2  | 2 點  |
| SPADE_3  | HEART_3  | CLUB_3  | DIAMOND_3  | 3 點  |
| SPADE_4  | HEART_4  | CLUB_4  | DIAMOND_4  | 4 點  |
| SPADE_5  | HEART_5  | CLUB_5  | DIAMOND_5  | 5 點  |
| SPADE_6  | HEART_6  | CLUB_6  | DIAMOND_6  | 6 點  |
| SPADE_7  | HEART_7  | CLUB_7  | DIAMOND_7  | 7 點  |
| SPADE_8  | HEART_8  | CLUB_8  | DIAMOND_8  | 8 點  |
| SPADE_9  | HEART_9  | CLUB_9  | DIAMOND_9  | 9 點  |
| SPADE_10 | HEART_10 | CLUB_10 | DIAMOND_10 | 10 點 |
| SPADE_J  | HEART_J  | CLUB_J  | DIAMOND_J  | 11 點 |
| SPADE_Q  | HEART_Q  | CLUB_Q  | DIAMOND_Q  | 12 點 |
| SPADE_K  | HEART_K  | CLUB_K  | DIAMOND_K  | 13 點 |

## 幸運輪專用卡牌

| 卡牌                   | 格數 | 倍率  | 顏色 |
|----------------------|----|-----|---|
| DROP_BALL_WHEEL27X3  | 27 | 3   | 黃 |
| DROP_BALL_WHEEL18X12 | 18 | 12  | 粉 |
| DROP_BALL_WHEEL5X16  | 5  | 16  | 綠 |
| DROP_BALL_WHEEL2X60  | 2  | 60  | 藍 |
| DROP_BALL_WHEELAX80  | 1  | 80  | 橘 |
| DROP_BALL_WHEELBX100 | 1  | 100 | 紅 |

## 執行步驟

| 順序 | 步驟                      | 描述                                                                                                      |
|----|-------------------------|---------------------------------------------------------------------------------------------------------|
| 1  | ROUND_START             | 本局開始<br/>標示本局開始                                                                                         |
| 2  | ROUND_BET               | 開始下注<br/>Duration: 下注秒數<br/>ex Duration：20 = 20秒                                                        |
| 3  | NO_MORE_BET             | 停止下注<br/>Duration: 倒數秒數，停止下注倒數提示                                                                        |
| 4  | THROW_BALL              | 丟球（取得開獎結果）<br/>Action:<br/>Cards:<br/>• CardType: POKER （目標遊戲為幸運球）<br/>                                 |
| 5  | ROUND_FINISHED          | 本局結束<br/>標示本局結束                                                                                         |
| 6  | LUCKY_WHEEL_ROUND_READY | 幸運輪就緒<br/>通知客戶端準備進入幸運輪流程                                                                                |
| 7  | LUCKY_WHEEL_ROUND_START | 本局開始<br/>標示本局正式開始                                                                                       |
| 8  | LUCKY_WHEEL_SPIN_WHEEL  | 開始轉輪盤（SPIN）<br/>Action:<br/>Cards:<br/>• CardType: WHEEL<br/>• List: [&#123;Code: 4&#125;]（表示開出第 4 格卡牌） |
| 9  | ROUND_FINISHED          | 本局結束<br/>標示本局結束，並推送結果資料                                                                                 |
