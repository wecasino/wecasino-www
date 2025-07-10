<!-- markdownlint-disable MD033 -->
# 番摊 (FANTAN)

## 游戏代码

- GameType: `FANTAN`
- 数值: 20

## 游戏说明

番摊数据格式，没有靴，只有一个主播荷官位置，使用卡牌类型为整数卡牌(INT)，当番摊抓子后，会更新局数据内荷官位置(DEALER)的场上(FIELD)卡牌。并通过数据推送接口，通知运营商。

## 番摊子类型

| 卡牌 | 描述 |
|------|------|
| FANTAN_CLASSIC | 经典番摊 |

## 座位与资源配置

| 座位 | 资源 | 卡牌类型 | 描述 |
|------|------|----------|------|
| DEALER | FIELD | INT | 本局结果 |

## 整数卡牌

| 卡牌 | 描述 |
|------|------|
| 50-200(随机数) | 番摊点数再除以4，余0 则为4，取得1~4值。0表示尚未开牌。 |

## 执行步骤

| 顺序 | 步骤 | 描述 |
|------|------|------|
| 1 | ROUND_START | 本局开始<br/>标示本局开始 |
| 2 | ROUND_BET | 开始下注<br/>Duration: 下注秒数<br/>ex Duration：45 = 45秒 |
| 3 | NO_MORE_BET | 停止下注<br/>Duration: 下注秒数<br/>ex Duration：45 = 45秒 |
| 4 | GRAB_DICE_AMOUNT | 抓子（取得开奖结果）<br/>Action:<br/>Cards:<br/>• CardType: INT （目标游戏为番摊）<br/>• List: [&#123;Code: 149&#125;] （开149点数再除以4取得1~4值） |
| 5 | ROUND_FINISHED | 本局结束<br/>标示本局结束 |
