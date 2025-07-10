<!-- markdownlint-disable MD033 -->

# 色彩遊戲 (COLORGAME)

## 遊戲代碼

- GameType: `COLORGAME`
- 數值: 33

## 遊戲說明

色彩遊戲資料格式，沒有靴，只有一個主播荷官位置，使用卡牌類型為色彩(COLOR)，當色彩遊戲擲骰後，會更新局資料內荷官位置(DEALER)
的場上(NORMAL)卡牌。並透過資料推播接口，通知營運商。
當三個色彩相同時，進入SUPER GAME 模式。
SUPER GAME 模式，沒有靴，只有一個主播荷官位置，使用卡牌類型為色彩(COLOR)，當SUPER GAME擲骰後，會更新局資料內荷官位置(DEALER)
的場上(SUPER_GAME)卡牌。並透過資料推播接口，通知營運商。

## 色彩遊戲子類型

| 卡牌                   | 描述      |
|----------------------|---------|
| COLORGAME_CLASSIC    | 經典色彩遊戲  |
| COLOR_MINI           | 迷你色彩遊戲  |
| COLORGAME_BLOCKCHAIN | 區塊鏈色彩遊戲 |

## 座位與資源配置

| 座位     | 資源         | 卡牌類型  | 描述                 |
|--------|------------|-------|--------------------|
| DEALER | NORMAL     | COLOR | 本局結果               |
| DEALER | SUPER_GAME | COLOR | 色彩遊戲 SUPER GAME 結果 |

## 色彩遊戲專用卡牌

| 卡牌      | 顏色 |
|---------|----|
| Color_1 | 黃  |
| Color_2 | 藍  |
| Color_3 | 粉  |
| Color_4 | 綠  |
| Color_5 | 紅  |
| Color_6 | 白  |

## 執行步驟

| 順序 | 步驟                     | 描述                                                                                                    |
|----|------------------------|-------------------------------------------------------------------------------------------------------|
| 1  | ROUND_START            | 本局開始<br/>標示本局開始                                                                                       |
| 2  | ROUND_BET              | 開始下注<br/>Duration: 下注秒數<br/>ex Duration：25 = 25秒                                                      |
| 3  | NO_MORE_BET            | 停止下注<br/>Duration: 倒數秒數，停止下注倒數提示                                                                      |
| 4  | THROW_COLOR            | 丟球（色彩開獎）<br/>Action:<br/>Cards:<br/>• CardType:Color （目標遊戲為色彩遊戲）                                      |
| 5  | ROUND_FINISHED         | 本局結束<br/>標示本局結束                                                                                       |
| 6  | SUPER_GAME_ROUND_READY | SUPERGAME就緒<br/>通知客戶端準備進入SUPERGAME流程                                                                  |
| 7  | SUPER_GAME_ROUND_START | SUPERGAME開始<br/>標示SUPERGAME正式開始                                                                       |
| 8  | SUPER_GAME_ROUND_BET   | SUPERGAME下注階段<br/>Duration: SUPERGAME下注時間                                                             |
| 9  | SUPER_GAME_NO_MORE_BET | SUPERGAME停止下注<br/>倒數提示結束                                                                              |
| 10 | SUPER_GAME_THROW_COLOR | SUPERGAME擲球開獎<br/>Action:<br/>Cards:<br/>• CardType: Color<br/>• List: [&#123;Code: 4&#125;]（開出第 4 格） |
| 11 | ROUND_FINISHED         | 本局結束<br/>推送結果資料                                                                                       |
