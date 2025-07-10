---
id: Proto
---

<!-- markdownlint-disable MD033 -->
# 消息格式

## 通知类型

### 说明

* 随着游戏进行，会发生不同事件。每个事件发生时，都有一个对应的**通知类型**(GameNotifyType)，以及一个**事件消息**，该消息总共有四种消息格式：**GameProvide**, **ShiftRecord**, **ShoeRecord**, **RoundRecord**。

### 列表

| GameNotifyType | body消息格式 | 触发时间 |
|----------------|-------------|------|
| NOTIFY_GAME_PROVIDE_STATE_CHANGE | GameProvide | 游戏供应状况改变时通知 |
| NOTIFY_GAME_DEALER_LOGIN | GameProvide | 游戏流程荷官登入时通知 |
| NOTIFY_GAME_DEALER_LOGOUT | GameProvide | 游戏流程荷官登出时通知 |
| NOTIFY_GAME_CHANGING_SHOE | GameProvide | 游戏流程开始换靴时通知 |
| NOTIFY_SHIFT_START | ShiftRecord | 新班次开始时通知 |
| NOTIFY_SHIFT_END | ShiftRecord | 此班次结束时通知 |
| NOTIFY_SHOE_START | ShoeRecord | 新靴开始时通知 |
| NOTIFY_SHOE_END | ShoeRecord | 此靴结束时通知 |
| NOTIFY_ROUND_START | RoundRecord | 新局开始时通知 |
| NOTIFY_ROUND_BET | RoundRecord | 游戏局开始下注时通知 |
| NOTIFY_ROUND_NO_MORE_BET | RoundRecord | 游戏局结束下注时通知 |
| NOTIFY_ROUND_STEP | RoundRecord | 游戏局进行步骤时通知 |
| NOTIFY_ROUND_FINISH | RoundRecord | 游戏局完成时通知 |
| NOTIFY_ROUND_CANCEL | RoundRecord | 游戏局取消时通知 |
| NOTIFY_ROUND_PLAYBACK | RoundRecord | 游戏局建立完回放时通知 |

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L284)

## GameProvide

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L391)

* 记录游戏当下供应状态、荷官、直播信息等

| 字段 | 类型 | 说明 |
|------|------|------|
| supplier | string | 游戏供应 |
| game_type | string | 游戏类型 |
| game_subtype | string | 游戏子类型 |
| game_code | string | 游戏代码 |
| tags | map&lt;string, string&gt; | 标签 |
| state | GameProvideState | 状态 |
| players | map&lt;int32, string&gt; | 玩家入座 |
| players_name | map&lt;string, string&gt; | 玩家姓名 |
| medias | map&lt;string, string&gt; | 附加媒体：key: 媒体资源代码；value: 媒体内容。 |
| live_streams | map&lt;string, LiveStreamParams&gt; | 直播参数 |
| last_round_code | string | 最后一局 |

### GameProvideState

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L340)

游戏供应状态类型

| 值 | 代码 | 说明 |
|---|------|------|
| 0 | GAME_PROVIDE_STATE_UNSPECIFIED | 未指定 |
| 1 | GAME_PROVIDE_AVAILABLE | 提供 |
| 2 | GAME_PROVIDE_MAINTEN_AFTER_ROUND | 此局结束后维护 |
| 3 | GAME_PROVIDE_IN_MAINTENANCE | 维护 |
| 4 | GAME_PROVIDE_CLOSE_AFTER_ROUND | 此局结束后关闭 |
| 5 | GAME_PROVIDE_CLOSE | 此局结束后关闭 |
| 6 | GAME_PROVIDE_AVAILABLE_AFTER_ROUND | 此局结束后关闭 |

### LiveStreamParams

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L367)

直播信息，组成直播网址时需要

| 字段 | 类型 | 说明 |
|------|------|------|
| code | string | 串流代码 |
| app | string | 应用 |
| channel | string | 频道 |

## ShiftRecord

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L279)

排班记录

| 字段 | 类型 | 说明 |
|------|------|------|
| id | bytes | 记录ID |
| supplier | string | 游戏供应 |
| game_type | string | 游戏类型 |
| game_subtype | string | 游戏子类型 |
| game_version | string | 游戏版本 |
| game_code | string | 游戏代码 |
| table_code | string | 桌代码 |
| shift_code | string | 班代码 |
| ts_start | google.protobuf.Timestamp | 开始时间 |
| tags | map&lt;string, string&gt; | 标签 |
| round_codes | repeated string | 执行游戏局 |
| shoe_codes | repeated string | 洗牌 |
| is_end | bool | 结束 |
| ts_end | google.protobuf.Timestamp | 结束时间 |
| test | bool | 是否测试 |

## ShoeRecord

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L242)

靴记录

| 字段 | 类型 | 说明 |
|------|------|------|
| id | bytes | 记录ID |
| supplier | string | 游戏供应 |
| game_type | string | 游戏类型 |
| game_subtype | string | 游戏子类型 |
| game_version | string | 游戏版本 |
| game_code | string | 游戏代码 |
| table_code | string | 桌代码 |
| shift_code | string | 班代码 |
| shoe_code | string | 使用洗牌代码 |
| ts_start | google.protobuf.Timestamp | 此牌靴开始使用时间 |
| decks | map&lt;int32, Deck&gt; | cardList |
| is_end | bool | 此牌靴已使用完毕，不可再使用 |
| ts_end | google.protobuf.Timestamp | 牌靴使用完毕时间 |
| test | bool | 是否测试 |

### Deck

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L226)

一副牌

| 字段 | 类型 | 说明 |
|------|------|------|
| cards | CardList | 卡牌 |
| start_index | int64 | 起始位置（削牌后） |
| cut_index | int64 | 切牌位置 |
| index | int64 | 目前位置 |

## RoundRecord

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L152)

局记录

| 字段 | 类型 | 说明 |
|------|------|------|
| id | bytes | 记录ID |
| supplier | string | 游戏供应 |
| game_type | string | 游戏类型 |
| game_subtype | string | 游戏子类型 |
| game_version | string | 游戏版本 |
| game_code | string | 游戏代码 |
| table_code | string | 桌代码 |
| shift_code | string | 班代码 |
| shift_round | int64 | 此排班局数 |
| shoe_code | string | 使用靴代码 |
| shoe_round | int64 | 使用此洗牌第几局，从1开始计算 |
| round_code | string | 局代码 |
| tags | map&lt;string, string&gt; | 标签 |
| ts_start | google.protobuf.Timestamp | 开始时间 |
| bet_step | BetStep | 下注状态 |
| seats | map&lt;int32, Seat&gt; | 座位组 |
| players | map&lt;int32, string&gt; | 玩家入座 |
| players_name | map&lt;string, string&gt; | 玩家姓名 |
| process | repeated Step | 历程 |
| is_end | bool | 结束 |
| ts_end | google.protobuf.Timestamp | 结束时间 |
| cancel | bool | 取消 |
| cancel_code | string | 取消代码：CancelReasonCode |
| cancel_message | string | 取消备注 |
| win_type | map&lt;int32, games.WinType&gt; | 赢方 |
| medias | map&lt;string, string&gt; | 附加媒体：key: 媒体资源代码；value: 媒体内容。 |
| fortune_rates | map&lt;string, int64&gt; | 财神倍率 |
| test | bool | 是否测试 |

### BetStep

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L88)

下注步骤

| 值 | 代码 | 说明 |
|---|------|------|
| 0 | BET_STEP_UNSPECIFIED | 未指定，此步骤与下注无关 |
| 1 | ROUND_BET | 开始下注 |
| 3 | NO_MORE_BET | 停止下注 |
| 4 | CARD | 牌异动 |

### Seat

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L123)

座位

| 字段 | 类型 | 说明 |
|------|------|------|
| code | int32 | 座位功能代码：SeatCode |
| cards | map&lt;int32, CardList&gt; | 各类手牌 |

### Step

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L102)

游戏步骤

| 字段 | 类型 | 说明 |
|------|------|------|
| code | int32 | 步骤代码：StepCode |
| seat | int32 | 玩家、执行者：SeatCode |
| timestamp | google.protobuf.Timestamp | 时间戳 |
| actions | repeated StepAction | 执行动作 |
| error | string | 执行错误 |
| cancel | bool | 取消 |
| duration | int64 | 分配毫秒数 |
| bet_step | BetStep | 下注动作 |

### StepAction

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L66)

执行动作：对某些资源进行增、删、移转

| 字段 | 类型 | 说明 |
|------|------|------|
| code | string | 行为说明代码 |
| type | StepActionType | 动作类型 |
| source_seat | int32 | 资源拥有座位。 |
| target_seat | int32 | 资源转移目标座位。 |
| cards | map&lt;int32, CardList&gt; | 目标卡牌资源 |
| data | google.protobuf.Any | （可选）附加数据 |

### StepActionType

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L45)

动作类型

| 值 | 代码 | 说明 |
|---|------|------|
| 0 | STEP_ACTION_TYPE_UNSPECIFIED | 未指定 |
| 1 | ADD | 派发资源 |
| 2 | SET | 设定指定资源 |
| 3 | SETALL | 改写全部资源 |
| 4 | REMOVE | 将资源从场上移除 |
| 5 | READ | 读取卡牌数据 |
| 6 | READ_UNVISIBLE | 读卡但不可见 |
| 7 | TRANSFER | 移转资源 |
| 8 | VISIBLE | 卡片正反面 |
| 9 | STATUS | 卡牌状态改变 |
| 10 | NONE | 此步骤不须修改资源 |
| 11 | WIN | 决定输赢 |

### CardList

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L33)

卡牌列表

| 字段 | 类型 | 说明 |
|------|------|------|
| card_type | string |  |
| list | repeated Card | 列表 |
| pattern | int32 | 牌型 |

### Card

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L12)

卡牌，代表在此局中使用的各类物品

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 卡牌ID：牌唯一码 |
| code | string | 卡牌代码 |
| index | int64 | 顺序 |
| visible | bool | 可见 |
| status | int64 | 横放、直放... |
| plain_text | string | 明文 |
| signature | string | 签章 |
| sign_algorithm | string | 签章方法 |
