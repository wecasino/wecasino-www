<!-- markdownlint-disable MD033 -->
# 番攤 (FANTAN)

## 遊戲代碼

- GameType: `FANTAN`
- 數值: 20

## 遊戲說明

番攤資料格式，沒有靴，只有一個主播荷官位置，使用卡牌類型為整數卡牌(INT)，當番攤抓籽後，會更新局資料內荷官位置(DEALER)的場上(FIELD)卡牌。並透過資料推播接口，通知營運商。

## 番攤子類型

| 卡牌 | 描述 |
|------|------|
| FANTAN_CLASSIC | 經典番攤 |

## 座位與資源配置

| 座位 | 資源 | 卡牌類型 | 描述 |
|------|------|----------|------|
| DEALER | FIELD | INT | 本局結果 |

## 整數卡牌

| 卡牌 | 描述 |
|------|------|
| 50-200(隨機數) | 番攤點數再除以4，餘0 則為4，取得1~4值。0表示尚未開牌。 |

## 執行步驟

| 順序 | 步驟 | 描述 |
|------|------|------|
| 1 | ROUND_START | 本局開始<br/>標示本局開始 |
| 2 | ROUND_BET | 開始下注<br/>Duration: 下注秒數<br/>ex Duration：45 = 45秒 |
| 3 | NO_MORE_BET | 停止下注<br/>Duration: 下注秒數<br/>ex Duration：45 = 45秒 |
| 4 | GRAB_DICE_AMOUNT | 抓籽（取得開獎結果）<br/>Action:<br/>Cards:<br/>• CardType: INT （目標遊戲為番攤）<br/>• List: [&#123;Code: 149&#125;] （開149點數再除以4取得1~4值） |
| 5 | ROUND_FINISHED | 本局結束<br/>標示本局結束 |
