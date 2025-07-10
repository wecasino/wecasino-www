<!-- markdownlint-disable MD033 -->

# 色彩游戏 (COLORGAME)

## 游戏代码

- GameType: `COLORGAME`
- 数值: 33

## 游戏说明

色彩游戏数据格式，没有靴，只有一个主播荷官位置，使用卡牌类型为色彩(COLOR)，当色彩游戏掷骰后，会更新局数据内荷官位置(DEALER)
的场上(NORMAL)卡牌。并通过数据推送接口，通知运营商。
当三个色彩相同时，进入SUPER GAME 模式。
SUPER GAME 模式，没有靴，只有一个主播荷官位置，使用卡牌类型为色彩(COLOR)，当SUPER GAME掷骰后，会更新局数据内荷官位置(DEALER)
的场上(SUPER_GAME)卡牌。并通过数据推送接口，通知运营商。

## 色彩游戏子类型

| 卡牌                   | 描述      |
|----------------------|---------|
| COLORGAME_CLASSIC    | 经典色彩游戏  |
| COLOR_MINI           | 迷你色彩游戏  |
| COLORGAME_BLOCKCHAIN | 区块链色彩游戏 |

## 座位与资源配置

| 座位     | 资源         | 卡牌类型  | 描述                 |
|--------|------------|-------|--------------------|
| DEALER | NORMAL     | COLOR | 本局结果               |
| DEALER | SUPER_GAME | COLOR | 色彩游戏 SUPER GAME 结果 |

## 色彩游戏专用卡牌

| 卡牌      | 颜色 |
|---------|----|
| Color_1 | 黄  |
| Color_2 | 蓝  |
| Color_3 | 粉  |
| Color_4 | 绿  |
| Color_5 | 红  |
| Color_6 | 白  |

## 执行步骤

| 顺序 | 步骤                     | 描述                                                                                                    |
|----|------------------------|-------------------------------------------------------------------------------------------------------|
| 1  | ROUND_START            | 本局开始<br/>标示本局开始                                                                                       |
| 2  | ROUND_BET              | 开始下注<br/>Duration: 下注秒数<br/>ex Duration：25 = 25秒                                                      |
| 3  | NO_MORE_BET            | 停止下注<br/>Duration: 倒数秒数，停止下注倒数提示                                                                      |
| 4  | THROW_COLOR            | 丢球（色彩开奖）<br/>Action:<br/>Cards:<br/>• CardType:Color （目标游戏为色彩游戏）                                      |
| 5  | ROUND_FINISHED         | 本局结束<br/>标示本局结束                                                                                       |
| 6  | SUPER_GAME_ROUND_READY | SUPERGAME就绪<br/>通知客户端准备进入SUPERGAME流程                                                                  |
| 7  | SUPER_GAME_ROUND_START | SUPERGAME开始<br/>标示SUPERGAME正式开始                                                                       |
| 8  | SUPER_GAME_ROUND_BET   | SUPERGAME下注阶段<br/>Duration: SUPERGAME下注时间                                                             |
| 9  | SUPER_GAME_NO_MORE_BET | SUPERGAME停止下注<br/>倒数提示结束                                                                              |
| 10 | SUPER_GAME_THROW_COLOR | SUPERGAME掷球开奖<br/>Action:<br/>Cards:<br/>• CardType: Color<br/>• List: [&#123;Code: 4&#125;]（开出第 4 格） |
| 11 | ROUND_FINISHED         | 本局结束<br/>推送结果数据                                                                                       |
