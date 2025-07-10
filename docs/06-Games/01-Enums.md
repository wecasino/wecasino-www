<!-- markdownlint-disable MD033 -->
# Game

## 遊戲類型

| 值 | 代碼 | 遊戲名稱 |
|---|------|----------|
| 0 | GAME_TYPE_UNSPECIFIED | 未指定 |
| 16 | BACCARAT | 百家樂 |
| 17 | THEBIGBATTLE | 龍虎鬥 |
| 18 | THREECARDS | 炸金花 |
| 20 | FANTAN | 番攤 |
| 32 | SICBO | 骰寶 |
| 40 | LUCKYWHEEL | 幸運輪 |

## 流程共用參數

* 此API資料格式通用各種遊戲類型，所以許多欄位會依據遊戲變化。
* 但有許多遊戲都是類似，所以有定義一些流程共用參數，各遊戲可以直接使用。

### 座位

* 「座位」用來代表遊戲中的玩家、荷官、莊、閒等任何卡牌可能歸屬的地方

* 共用座位值

| 值 | 代碼 | 說明 |
|---|------|------|
| 0 | SEAT_UNSPECIFIED | 未指定 |
| 64 | DEALER | 荷官 |
| 65 | PREVIOUS_DEALER | 上一位荷官 |
| 66 | PITBOSS | 主管 |
| 67 | PREVIOUS_PITBOSS | 上一位主管 |
| 68 | PLAYER | 玩家 |
| 69 | BANKER | 莊家 |
| 70 | LEFT | 左方 |
| 71 | RIGHT | 右方 |
| 96 | CONTROL | 流程控制牌 |
| 99 | Instructions | 玩家指示 |

### 資源類型

* 「資源類型」表示這些卡牌可能的分類，例如：百家樂中，座位：閒，有「例牌」、「補牌」兩種資源

| 值 | 代碼 | 說明 |
|---|------|------|
| 0 | RESOURCE_TYPE_UNSPECIFIED | 未指定 |
| 64 | SHOE | 牌靴 |
| 65 | HAND | 手牌 |
| 66 | FIELD | 場上 |
| 67 | FIRST_CARD | 第一張牌 |
| 68 | SHOE_CUT | 切牌 |
| 69 | DISCARD | 棄牌 |

### 輸贏

* 記錄輸贏

| 值 | 代碼 | 說明 |
|---|------|------|
| 0 | WIN_TYPE_UNSPECIFIED | 未指定 |
| 1 | LOSE | 輸 |
| 2 | WIN | 贏 |
| 3 | TIE | 和 |

## 卡牌

### 撲克牌

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

### 骰子

| 值 | 代碼 | 描述 |
|---|------|------|
| 0 | DICE_CARD_UNSPECIFIED | 未指定 |
| 1 | DICE_1 | 1 點 |
| 2 | DICE_2 | 2 點 |
| 3 | DICE_3 | 3 點 |
| 4 | DICE_4 | 4 點 |
| 5 | DICE_5 | 5 點 |
| 6 | DICE_6 | 6 點 |

### 幸運輪

| 值 | 代碼 | 描述 |
|---|------|------|
| 0 | WHEEL_UNSPECIFIED | 未指定 |
| 1 | WHEEL24X1 | 24格 1倍 |
| 2 | WHEEL12X3 | 12格 3倍 |
| 3 | WHEEL8X5 | 8格 5倍 |
| 4 | WHEEL4X10 | 4格 10倍 |
| 5 | WHEEL2X20 | 2格 20倍 |
| 6 | WHEELAX45 | 1格 45倍 |
| 7 | WHEELBX45 | 1格 45倍 |
