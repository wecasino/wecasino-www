<!-- markdownlint-disable MD033 -->

# 幸运球 (DROPBALL)

## 游戏代码

- GameType: `DROPBALL`
- 数值: 34

## 游戏说明

幸运球数据格式，没有靴，只有一个主播荷官位置，使用卡牌类型为扑克牌(POKERCARD)，当幸运球掷骰后，会更新局数据内荷官位置(DEALER)
的场上(FIELD)卡牌。并通过数据推送接口，通知运营商。

幸运球子类型为幸运球 JACKPOT 模式时，且三个球相同时，进入幸运球 JACKPOT 模式。
幸运球 JACKPOT 模式，没有靴，只有一个主播荷官位置，使用卡牌类型为幸运轮(WHEEL)，当幸运轮转动完，会更新局数据内荷官位置(
DEALER)
的场上(WHEEL)卡牌。并通过数据推送接口，通知运营商。

## 幸运球子类型

| 卡牌                    | 描述              |
|-----------------------|-----------------|
| DROPBALL_CLASSIC      | 经典幸运球           |
| DROPBALL_COCONUT_BALL | 椰子球             |
| DROPBALL_JACKPOT      | 幸运球  JACKPOT 模式 |
| DROPBALL_BLOCKCHAIN   | 区块链幸运球          |

## 座位与资源配置

| 座位     | 资源          | 卡牌类型  | 描述                |
|--------|-------------|-------|-------------------|
| DEALER | FIELD       | POKER | 本局结果              |
| DEALER | LUCKY_WHEEL | WHEEL | 幸运球 JACKPOT 子类型结果 |

## 扑克牌专用卡牌

| 黑桃卡牌     | 红心卡牌     | 梅花卡牌    | 方块卡牌       | 描述   |
|----------|----------|---------|------------|------|
| SPADE_A  | HEART_A  | CLUB_A  | DIAMOND_A  | 1 点  |
| SPADE_2  | HEART_2  | CLUB_2  | DIAMOND_2  | 2 点  |
| SPADE_3  | HEART_3  | CLUB_3  | DIAMOND_3  | 3 点  |
| SPADE_4  | HEART_4  | CLUB_4  | DIAMOND_4  | 4 点  |
| SPADE_5  | HEART_5  | CLUB_5  | DIAMOND_5  | 5 点  |
| SPADE_6  | HEART_6  | CLUB_6  | DIAMOND_6  | 6 点  |
| SPADE_7  | HEART_7  | CLUB_7  | DIAMOND_7  | 7 点  |
| SPADE_8  | HEART_8  | CLUB_8  | DIAMOND_8  | 8 点  |
| SPADE_9  | HEART_9  | CLUB_9  | DIAMOND_9  | 9 点  |
| SPADE_10 | HEART_10 | CLUB_10 | DIAMOND_10 | 10 点 |
| SPADE_J  | HEART_J  | CLUB_J  | DIAMOND_J  | 11 点 |
| SPADE_Q  | HEART_Q  | CLUB_Q  | DIAMOND_Q  | 12 点 |
| SPADE_K  | HEART_K  | CLUB_K  | DIAMOND_K  | 13 点 |

## 幸运轮专用卡牌

| 卡牌                   | 格数 | 倍率  | 颜色 |
|----------------------|----|-----|---|
| DROP_BALL_WHEEL27X3  | 27 | 3   | 黄 |
| DROP_BALL_WHEEL18X12 | 18 | 12  | 粉 |
| DROP_BALL_WHEEL5X16  | 5  | 16  | 绿 |
| DROP_BALL_WHEEL2X60  | 2  | 60  | 蓝 |
| DROP_BALL_WHEELAX80  | 1  | 80  | 橙 |
| DROP_BALL_WHEELBX100 | 1  | 100 | 红 |

## 执行步骤

| 顺序 | 步骤                      | 描述                                                                                                      |
|----|-------------------------|---------------------------------------------------------------------------------------------------------|
| 1  | ROUND_START             | 本局开始<br/>标示本局开始                                                                                         |
| 2  | ROUND_BET               | 开始下注<br/>Duration: 下注秒数<br/>ex Duration：20 = 20秒                                                        |
| 3  | NO_MORE_BET             | 停止下注<br/>Duration: 倒数秒数，停止下注倒数提示                                                                        |
| 4  | THROW_BALL              | 丢球（取得开奖结果）<br/>Action:<br/>Cards:<br/>• CardType: POKER （目标游戏为幸运球）<br/>                                 |
| 5  | ROUND_FINISHED          | 本局结束<br/>标示本局结束                                                                                         |
| 6  | LUCKY_WHEEL_ROUND_READY | 幸运轮就绪<br/>通知客户端准备进入幸运轮流程                                                                                |
| 7  | LUCKY_WHEEL_ROUND_START | 本局开始<br/>标示本局正式开始                                                                                       |
| 8  | LUCKY_WHEEL_SPIN_WHEEL  | 开始转轮盘（SPIN）<br/>Action:<br/>Cards:<br/>• CardType: WHEEL<br/>• List: [&#123;Code: 4&#125;]（表示开出第 4 格卡牌） |
| 9  | ROUND_FINISHED          | 本局结束<br/>标示本局结束，并推送结果数据                                                                                 |
