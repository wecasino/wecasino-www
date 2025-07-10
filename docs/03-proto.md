---
id: Proto
---

<!-- markdownlint-disable MD033 -->
# 訊息格式

## 通知類型

### 說明

* 隨者遊戲進行，會發生不同事件。每個事件發生時，都有一個對應的**通知類型**(GameNotifyType)，以及一個**事件訊息**，該訊息總共有四種訊息格式：**GameProvide**, **ShiftRecord**, **ShoeRecord**, **RoundRecord**。

### 列表

| GameNotifyType | body訊息格式 | 觸發時間 |
|----------------|-------------|------|
| NOTIFY_GAME_PROVIDE_STATE_CHANGE | GameProvide | 遊戲供應狀況改變時通知 |
| NOTIFY_GAME_DEALER_LOGIN | GameProvide | 遊戲流程荷官登入時通知 |
| NOTIFY_GAME_DEALER_LOGOUT | GameProvide | 遊戲流程荷官登出時通知 |
| NOTIFY_GAME_CHANGING_SHOE | GameProvide | 遊戲流程開始換靴時通知 |
| NOTIFY_SHIFT_START | ShiftRecord | 新班次開始時通知 |
| NOTIFY_SHIFT_END | ShiftRecord | 此班次結束時通知 |
| NOTIFY_SHOE_START | ShoeRecord | 新靴開始時通知 |
| NOTIFY_SHOE_END | ShoeRecord | 此靴結束時通知 |
| NOTIFY_ROUND_START | RoundRecord | 新局開始時通知 |
| NOTIFY_ROUND_BET | RoundRecord | 遊戲局開始下注時通知 |
| NOTIFY_ROUND_NO_MORE_BET | RoundRecord | 遊戲局結束下注時通知 |
| NOTIFY_ROUND_STEP | RoundRecord | 遊戲局進行步驟時通知 |
| NOTIFY_ROUND_FINISH | RoundRecord | 遊戲局完成時通知 |
| NOTIFY_ROUND_CANCEL | RoundRecord | 遊戲局取消時通知 |
| NOTIFY_ROUND_PLAYBACK | RoundRecord | 遊戲局建立完回放時通知 |

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L284)

## GameProvide

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L391)

* 記錄遊戲當下供應狀態、荷官、直播資訊等

| 欄位 | 類型 | 說明 |
|------|------|------|
| supplier | string | 遊戲供應 |
| game_type | string | 遊戲類型 |
| game_subtype | string | 遊戲子類型 |
| game_code | string | 遊戲代碼 |
| tags | map&lt;string, string&gt; | 標籤 |
| state | GameProvideState | 狀態 |
| players | map&lt;int32, string&gt; | 玩家入座 |
| players_name | map&lt;string, string&gt; | 玩家姓名 |
| medias | map&lt;string, string&gt; | 附加媒體：key: 媒體資源代碼；value: 媒體內容。 |
| live_streams | map&lt;string, LiveStreamParams&gt; | 直播參數 |
| last_round_code | string | 最後一局 |

### GameProvideState

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L340)

遊戲供應狀態類型

| 值 | 代碼 | 說明 |
|---|------|------|
| 0 | GAME_PROVIDE_STATE_UNSPECIFIED | 未指定 |
| 1 | GAME_PROVIDE_AVAILABLE | 提供 |
| 2 | GAME_PROVIDE_MAINTEN_AFTER_ROUND | 此局結束後維護 |
| 3 | GAME_PROVIDE_IN_MAINTENANCE | 維護 |
| 4 | GAME_PROVIDE_CLOSE_AFTER_ROUND | 此局結束後關閉 |
| 5 | GAME_PROVIDE_CLOSE | 此局結束後關閉 |
| 6 | GAME_PROVIDE_AVAILABLE_AFTER_ROUND | 此局結束後關閉 |

### LiveStreamParams

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L367)

直播資訊，組成直播網址時需要

| 欄位 | 類型 | 說明 |
|------|------|------|
| code | string | 串流代碼 |
| app | string | 應用 |
| channel | string | 頻道 |

## ShiftRecord

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L279)

排班記錄

| 欄位 | 類型 | 說明 |
|------|------|------|
| id | bytes | 紀錄ID |
| supplier | string | 遊戲供應 |
| game_type | string | 遊戲類型 |
| game_subtype | string | 遊戲子類型 |
| game_version | string | 遊戲版本 |
| game_code | string | 遊戲代碼 |
| table_code | string | 桌代碼 |
| shift_code | string | 班代碼 |
| ts_start | google.protobuf.Timestamp | 開始時間 |
| tags | map&lt;string, string&gt; | 標籤 |
| round_codes | repeated string | 執行遊戲局 |
| shoe_codes | repeated string | 洗牌 |
| is_end | bool | 結束 |
| ts_end | google.protobuf.Timestamp | 結束時間 |
| test | bool | 是否測試 |

## ShoeRecord

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L242)

靴紀錄

| 欄位 | 類型 | 說明 |
|------|------|------|
| id | bytes | 紀錄ID |
| supplier | string | 遊戲供應 |
| game_type | string | 遊戲類型 |
| game_subtype | string | 遊戲子類型 |
| game_version | string | 遊戲版本 |
| game_code | string | 遊戲代碼 |
| table_code | string | 桌代碼 |
| shift_code | string | 班代碼 |
| shoe_code | string | 使用洗牌代碼 |
| ts_start | google.protobuf.Timestamp | 此牌靴開始使用時間 |
| decks | map&lt;int32, Deck&gt; | cardList |
| is_end | bool | 此牌靴已使用完畢，不可再使用 |
| ts_end | google.protobuf.Timestamp | 牌靴使用完畢時間 |
| test | bool | 是否測試 |

### Deck

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L226)

一副牌

| 欄位 | 類型 | 說明 |
|------|------|------|
| cards | CardList | 卡牌 |
| start_index | int64 | 起始位置（削牌後） |
| cut_index | int64 | 切牌位置 |
| index | int64 | 目前位置 |

## RoundRecord

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L152)

局紀錄

| 欄位 | 類型 | 說明 |
|------|------|------|
| id | bytes | 紀錄ID |
| supplier | string | 遊戲供應 |
| game_type | string | 遊戲類型 |
| game_subtype | string | 遊戲子類型 |
| game_version | string | 遊戲版本 |
| game_code | string | 遊戲代碼 |
| table_code | string | 桌代碼 |
| shift_code | string | 班代碼 |
| shift_round | int64 | 此排班局數 |
| shoe_code | string | 使用靴代碼 |
| shoe_round | int64 | 使用此洗牌第幾局，從1開始計算 |
| round_code | string | 局代碼 |
| tags | map&lt;string, string&gt; | 標籤 |
| ts_start | google.protobuf.Timestamp | 開始時間 |
| bet_step | BetStep | 下注狀態 |
| seats | map&lt;int32, Seat&gt; | 座位組 |
| players | map&lt;int32, string&gt; | 玩家入座 |
| players_name | map&lt;string, string&gt; | 玩家姓名 |
| process | repeated Step | 歷程 |
| is_end | bool | 結束 |
| ts_end | google.protobuf.Timestamp | 結束時間 |
| cancel | bool | 取消 |
| cancel_code | string | 取消代碼：CancelReasonCode |
| cancel_message | string | 取消備註 |
| win_type | map&lt;int32, games.WinType&gt; | 贏方 |
| medias | map&lt;string, string&gt; | 附加媒體：key: 媒體資源代碼；value: 媒體內容。 |
| fortune_rates | map&lt;string, int64&gt; | 財神倍率 |
| test | bool | 是否測試 |

### BetStep

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L88)

下注步驟

| 值 | 代碼 | 說明 |
|---|------|------|
| 0 | BET_STEP_UNSPECIFIED | 未指定，此步驟與下注無關 |
| 1 | ROUND_BET | 開始下注 |
| 3 | NO_MORE_BET | 停止下注 |
| 4 | CARD | 牌異動 |

### Seat

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L123)

座位

| 欄位 | 類型 | 說明 |
|------|------|------|
| code | int32 | 座位功能代碼：SeatCode |
| cards | map&lt;int32, CardList&gt; | 各類手牌 |

### Step

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L102)

遊戲步驟

| 欄位 | 類型 | 說明 |
|------|------|------|
| code | int32 | 步驟代碼：StepCode |
| seat | int32 | 玩家、執行者：SeatCode |
| timestamp | google.protobuf.Timestamp | 時間戳 |
| actions | repeated StepAction | 執行動作 |
| error | string | 執行錯誤 |
| cancel | bool | 取消 |
| duration | int64 | 分配毫秒數 |
| bet_step | BetStep | 下注動作 |

### StepAction

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L66)

執行動作：對某些資源進行增、刪、移轉

| 欄位 | 類型 | 說明 |
|------|------|------|
| code | string | 行為說明代碼 |
| type | StepActionType | 動作類型 |
| source_seat | int32 | 資源擁有座位。 |
| target_seat | int32 | 資源轉移目標座位。 |
| cards | map&lt;int32, CardList&gt; | 目標卡牌資源 |
| data | google.protobuf.Any | （可選）附加資料 |

### StepActionType

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L45)

動作類型

| 值 | 代碼 | 說明 |
|---|------|------|
| 0 | STEP_ACTION_TYPE_UNSPECIFIED | 未指定 |
| 1 | ADD | 派發資源 |
| 2 | SET | 設定指定資源 |
| 3 | SETALL | 改寫全部資源 |
| 4 | REMOVE | 將資源從場上移除 |
| 5 | READ | 讀取卡牌資料 |
| 6 | READ_UNVISIBLE | 讀卡但不可見 |
| 7 | TRANSFER | 移轉資源 |
| 8 | VISIBLE | 卡片正反面 |
| 9 | STATUS | 卡牌狀態改變 |
| 10 | NONE | 此步驟不須修改資源 |
| 11 | WIN | 決定輸贏 |

### CardList

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L33)

卡牌列表

| 欄位 | 類型 | 說明 |
|------|------|------|
| card_type | string |  |
| list | repeated Card | 列表 |
| pattern | int32 | 牌型 |

### Card

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L12)

卡牌，代表在此局中使用的各類物品

| 欄位 | 類型 | 說明 |
|------|------|------|
| id | string | 卡牌ID：牌唯一碼 |
| code | string | 卡牌代碼 |
| index | int64 | 順序 |
| visible | bool | 可見 |
| status | int64 | 橫放、直放... |
| plain_text | string | 明文 |
| signature | string | 簽章 |
| sign_algorithm | string | 簽章方法 |
