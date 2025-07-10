<!-- markdownlint-disable MD033 -->
# 龙虎斗 (THEBIGBATTLE)

## 游戏代码

- GameType: `THEBIGBATTLE`
- 数值: 17

## 游戏说明

龙虎数据格式，有靴，有左右手牌位置各1张，使用卡牌类型为扑克牌(POKERCARD)，当开玩家手牌后，会更新局数据内左右手牌位置(LEFT/RIGHT)的手上(HAND)卡牌。并通过数据推送接口，通知运营商。

## 龙虎子类型

| 卡牌 | 描述 |
|------|------|
| THEBIGBATTLE_CLASSIC | 经典龙虎 |
| THEBIGBATTLE_SPEED | 极速龙虎 |
| THEBIGBATTLE_BLOCKCHAIN | 区块链龙虎 |
| THEBIGBATTLE_SPEED_BLOCKCHAIN | 区块链极速龙虎 |

## 座位与资源配置

| 座位 | 资源 | 卡牌类型 | 描述 |
|------|------|----------|------|
| LEFT | HAND | POKERCARD | 本局结果，左:龙 以玩家视角为主 |
| RIGHT | HAND | POKERCARD | 本局结果，右:虎 以玩家视角为主 |

## 扑克牌专用卡牌

| 黑桃卡牌 | 红心卡牌 | 梅花卡牌 | 方块卡牌 | 描述 |
|----------|----------|----------|----------|------|
| SPADE_A | HEART_A | CLUB_A | DIAMOND_A | 1 点 |
| SPADE_2 | HEART_2 | CLUB_2 | DIAMOND_2 | 2 点 |
| SPADE_3 | HEART_3 | CLUB_3 | DIAMOND_3 | 3 点 |
| SPADE_4 | HEART_4 | CLUB_4 | DIAMOND_4 | 4 点 |
| SPADE_5 | HEART_5 | CLUB_5 | DIAMOND_5 | 5 点 |
| SPADE_6 | HEART_6 | CLUB_6 | DIAMOND_6 | 6 点 |
| SPADE_7 | HEART_7 | CLUB_7 | DIAMOND_7 | 7 点 |
| SPADE_8 | HEART_8 | CLUB_8 | DIAMOND_8 | 8 点 |
| SPADE_9 | HEART_9 | CLUB_9 | DIAMOND_9 | 9 点 |
| SPADE_10 | HEART_10 | CLUB_10 | DIAMOND_10 | 10 点 |
| SPADE_J | HEART_J | CLUB_J | DIAMOND_J | 11 点 |
| SPADE_Q | HEART_Q | CLUB_Q | DIAMOND_Q | 12 点 |
| SPADE_K | HEART_K | CLUB_K | DIAMOND_K | 13 点 |

## 执行步骤

| 顺序 | 步骤 | 描述 |
|------|------|------|
| 1 | ROUND_START | 本局开始<br/>标示本局开始 |
| 2 | DEAL_LEFT | 派发左侧玩家手牌 |
| 3 | DEAL_RIGHT | 派发右侧玩家手牌 |
| 4 | ROUND_BET | 开始下注<br/>Duration: 下注秒数<br/>ex Duration：45 = 45秒 |
| 5 | NO_MORE_BET | 停止下注<br/>Duration: 下注秒数<br/>ex Duration：45 = 45秒 |
| 6 | SHOW_LEFT | 开左侧玩家手牌（取得开奖结果）<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD （目标游戏为卡牌）<br/>• List: [&#123;Code: DIAMOND_5&#125;] （开方块5） |
| 7 | SHOW_RIGHT | 开右侧玩家手牌（取得开奖结果）<br/>Action:<br/>Cards:<br/>• CardType: POKERCARD （目标游戏为卡牌）<br/>• List: [&#123;Code: SPADE_6&#125;] （开黑桃6） |
| 8 | ROUND_FINISHED | 本局结束<br/>标示本局结束 |
