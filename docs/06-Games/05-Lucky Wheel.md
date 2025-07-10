<!-- markdownlint-disable MD033 -->
# 幸運輪 (LUCKYWHEEL)

## 遊戲代碼

- GameType: `LUCKYWHEEL`
- 數值: 40

## 遊戲說明

彩虹幸運輪資料格式，沒有靴，只有一個主播荷官位置，使用卡牌類型為幸運輪專用卡牌WHEEL，當幸運輪停止轉動後，會更新局資料內荷官位置(DEALER)的場上(FIELD)卡牌。並透過資料推播接口，通知營運商。

## 幸運輪子類型

| 卡牌 | 描述 |
|------|------|
| LUCKYWHEEL_RAINBOW | 彩虹幸運輪 |

## 座位與資源配置

| 座位 | 資源 | 卡牌類型 | 描述 |
|------|------|----------|------|
| DEALER | FIELD | WHEEL | 本局結果 |

## 幸運輪專用卡牌

| 卡牌 | 格數 | 倍率 | 顏色 |
|------|------|------|------|
| WHEEL24X1 | 24 | 1 | 黃 |
| WHEEL12X3 | 12 | 3 | 藍 |
| WHEEL8X5 | 8 | 5 | 粉 |
| WHEEL4X10 | 4 | 10 | 綠 |
| WHEEL2X20 | 2 | 20 | 紫 |
| WHEELAX45 | 1 | 45 | 橘 |
| WHEELBX45 | 1 | 45 | 紅 |

## 執行步驟

| 順序 | 步驟 | 描述 |
|------|------|------|
| 1 | ROUND_START | 本局開始<br/>標示本局開始 |
| 2 | ROUND_BET | 開始下注<br/>Duration: 下注秒數<br/>ex Duration：45 = 45秒 |
| 3 | NO_MORE_BET | 停止下注<br/>Duration: 下注秒數<br/>ex Duration：45 = 45秒 |
| 4 | SPIN_WHEEL | 轉輪（取得開獎結果）<br/>Action:<br/>Cards:<br/>• CardType: WHEEL （目標遊戲為幸運輪）<br/>• List: [&#123;Code: WHEELAX45&#125;] （開橙色45倍） |
| 5 | ROUND_FINISHED | 本局結束<br/>標示本局結束 |
