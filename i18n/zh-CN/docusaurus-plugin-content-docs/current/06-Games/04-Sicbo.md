<!-- markdownlint-disable MD033 -->
# 骰宝 (SICBO)

## 游戏代码

- GameType: `SICBO`
- 数值: 32

## 游戏说明

骰宝数据格式，没有靴，只有一个主播荷官位置，使用卡牌类型为骰宝专用卡DICE，当骰宝掷骰后，会更新局数据内荷官位置(DEALER)的场上(FIELD)卡牌。并通过数据推送接口，通知运营商。

## 骰宝子类型

| 卡牌 | 描述 |
|------|------|
| SICBO_CLASSIC | 经典骰宝 |
| SICBO_FORTUNE | 财神骰宝 |
| SICBO_BLOCKCHAIN | 区块链骰宝 |

## 座位与资源配置

| 座位 | 资源 | 卡牌类型 | 描述 |
|------|------|----------|------|
| DEALER | FIELD | DICE | 本局结果 |

## 骰宝专用卡牌

| 卡牌 | 描述 |
|------|------|
| DICE_1 | 1 点 |
| DICE_2 | 2 点 |
| DICE_3 | 3 点 |
| DICE_4 | 4 点 |
| DICE_5 | 5 点 |
| DICE_6 | 6 点 |

## 执行步骤

| 顺序 | 步骤 | 描述 |
|------|------|------|
| 1 | ROUND_START | 本局开始<br/>标示本局开始 |
| 2 | ROUND_BET | 开始下注<br/>Duration: 下注秒数<br/>ex Duration：45 = 45秒 |
| 3 | NO_MORE_BET | 停止下注<br/>Duration: 下注秒数<br/>ex Duration：45 = 45秒 |
| 4 | THROW_DICE | 掷骰（取得开奖结果）<br/>Action:<br/>Cards:<br/>• CardType: DICE （目标游戏为骰宝）<br/>• List: [&#123;Code: DICE_2-DICE_3-DICE_5&#125;] （开2，3，5点数） |
| 5 | ROUND_FINISHED | 本局结束<br/>标示本局结束 |
