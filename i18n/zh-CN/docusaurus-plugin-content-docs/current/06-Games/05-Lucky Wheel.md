<!-- markdownlint-disable MD033 -->
# 幸运轮 (LUCKYWHEEL)

## 游戏代码

- GameType: `LUCKYWHEEL`
- 数值: 40

## 游戏说明

彩虹幸运轮数据格式，没有靴，只有一个主播荷官位置，使用卡牌类型为幸运轮专用卡牌WHEEL，当幸运轮停止转动后，会更新局数据内荷官位置(DEALER)的场上(FIELD)卡牌。并通过数据推送接口，通知运营商。

## 幸运轮子类型

| 卡牌 | 描述 |
|------|------|
| LUCKYWHEEL_RAINBOW | 彩虹幸运轮 |

## 座位与资源配置

| 座位 | 资源 | 卡牌类型 | 描述 |
|------|------|----------|------|
| DEALER | FIELD | WHEEL | 本局结果 |

## 幸运轮专用卡牌

| 卡牌 | 格数 | 倍率 | 颜色 |
|------|------|------|------|
| WHEEL24X1 | 24 | 1 | 黄 |
| WHEEL12X3 | 12 | 3 | 蓝 |
| WHEEL8X5 | 8 | 5 | 粉 |
| WHEEL4X10 | 4 | 10 | 绿 |
| WHEEL2X20 | 2 | 20 | 紫 |
| WHEELAX45 | 1 | 45 | 橙 |
| WHEELBX45 | 1 | 45 | 红 |

## 执行步骤

| 顺序 | 步骤 | 描述 |
|------|------|------|
| 1 | ROUND_START | 本局开始<br/>标示本局开始 |
| 2 | ROUND_BET | 开始下注<br/>Duration: 下注秒数<br/>ex Duration：45 = 45秒 |
| 3 | NO_MORE_BET | 停止下注<br/>Duration: 下注秒数<br/>ex Duration：45 = 45秒 |
| 4 | SPIN_WHEEL | 转轮（取得开奖结果）<br/>Action:<br/>Cards:<br/>• CardType: WHEEL （目标游戏为幸运轮）<br/>• List: [&#123;Code: WHEELAX45&#125;] （开橙色45倍） |
| 5 | ROUND_FINISHED | 本局结束<br/>标示本局结束 |
