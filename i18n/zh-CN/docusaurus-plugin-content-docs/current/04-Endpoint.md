<!-- markdownlint-disable MD033 -->
# 接口端点

## Notify API 接口

### AMQP

1. Notify API 使用 AMQP 协议，商户向端口注册订阅后，所有订阅桌游戏事件会在发生第一时间发送。
2. 每个运营商账号会有独立的Queue作为缓存，不会与其他运营商共用，运营商程序应常保Queue为空，如此数据可在第一时间传递。
3. 如果运营商有维护或其他事件而未能及时消化消息，于系统恢复后，将会收到Queue中所有此段期间缓存事件。
4. 通知类型(GameNotifyType)会放在AMQP标准封包中的**Type**字段，以及**Header**中
5. 消息对象，则是以grpc压缩成Binary，放在AMQP标准封包中的**Body**字段
6. 运营商系统可以在收取封包时，依照**Type**字段，用对应的格式，正确解析**Body**字段，取得消息对象。

### 示例

1. golang amqp091 套件解析示例

    ``` go
    func(delivery amqp091.Delivery) {
      notifyType := pbRecorder.GameNotifyType(pbRecorder.GameNotifyType_value[delivery.Type])


          logrus.Infof("receive game notifyType:[%v]", notifyType)
          switch notifyType {
          case pbRecorder.GameNotifyType_NOTIFY_GAME_DEALER_LOGIN,
              pbRecorder.GameNotifyType_NOTIFY_GAME_DEALER_LOGOUT,
              pbRecorder.GameNotifyType_NOTIFY_GAME_CHANGING_SHOE:
              gameProvide := &pbRecorder.GameProvide{}
              err := proto.Unmarshal(delivery.Body, gameProvide)
              …
          case pbRecorder.GameNotifyType_NOTIFY_SHIFT_START,
              pbRecorder.GameNotifyType_NOTIFY_SHIFT_END:
              shift := &pbRecorder.ShiftRecord{}
              err := proto.Unmarshal(delivery.Body, shift)
              …
          case pbRecorder.GameNotifyType_NOTIFY_SHOE_START,
              pbRecorder.GameNotifyType_NOTIFY_SHOE_END:
              shoe := &pbRecorder.ShoeRecord{}
              err := proto.Unmarshal(delivery.Body, shoe)
              …
          case pbRecorder.GameNotifyType_NOTIFY_ROUND_START,
              pbRecorder.GameNotifyType_NOTIFY_ROUND_BET,
              pbRecorder.GameNotifyType_NOTIFY_ROUND_NO_MORE_BET,
              pbRecorder.GameNotifyType_NOTIFY_ROUND_STEP,
              pbRecorder.GameNotifyType_NOTIFY_ROUND_FINISH,
              pbRecorder.GameNotifyType_NOTIFY_ROUND_CANCEL,
              pbRecorder.GameNotifyType_NOTIFY_ROUND_PLAYBACK:
              round := &pbRecorder.RoundRecord{}
              err := proto.Unmarshal(delivery.Body, round)

              ...

    ```

2. 完整示例 [Github](https://github.com/wecasino/wecasino-demo-backend-go/blob/main/queue/queue.go#L122)

## Provider API 查询接口

### gRPC 接口

1. Provider API 使用 proto定义 service，并开放 grpc 对外接口。
2. proto可以参阅我们的[GITHUB](https://github.com/wecasino/wecasino-proto/tree/main/protos)

### HTTP API

1. Provider API 我们也提供 HTTP API方式。
2. HTTP API 请详阅 [Swagger](https://api-doc.beta.wecasino.live)

### 期限

1. Provider API 提供最近7天回查记录

## Recorder Service

1. proto[Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/recorder.proto#L206)

### FetchShiftRecord

**说明**：读取班次记录list

**请求数据 (Request Message)**：

```json
{
   "game_code": "STUDIO-LW-LLWC01BETA"
}
```

**返回数据格式**：

```json
{
   "shift_record": [
       {
           "tags": [],
           "round_codes": [
               "ROUNLLWC01020024031600010001",
               "ROUNLLWC01020024031600010002",
               "ROUNLLWC01020024031600010003",
               "ROUNLLWC01020024031600010004"
           ],
           "shoe_codes": [
               "SHOELLWC01020024031600010001"
           ],
           "id": "ZfVz3RM6tc8ETVx8",
           "supplier": "wecasino-live",
           "game_type": "LUCKYWHEEL",
           "game_subtype": "LUCKYWHEEL_RANBOW",
           "game_version": "0.2.1",
           "game_code": "STUDIO-LW-LLWC01BETA",
           "table_code": "beta-t101",
           "shift_code": "SHIFLLWC0102002403160001",
           "ts_start": {
               "seconds": "1710584797",
               "nanos": 674000000
           },
           "is_end": true,
           "ts_end": {
               "seconds": "1710588261",
               "nanos": 198000000
           }
       }
   ]
}
```

### FetchLastOneShiftRecord

**说明**：读取最新班次记录

**请求数据 (Request Message)**：

```json
{
   "game_code": "STUDIO-LW-LLWC01BETA"
}
```

**返回数据格式**：

```json
{
   "shift_record": [
       {
           "tags": [],
           "round_codes": [
               "ROUNLLWC01020024032000130001"
           ],
           "shoe_codes": [
               "SHOELLWC01020024032000130001"
           ],
           "id": "ZfrYlmIu5EAUgudw",
           "supplier": "wecasino-live-auto",
           "game_type": "LUCKYWHEEL",
           "game_subtype": "LUCKYWHEEL_RANBOW",
           "game_version": "0.2.1",
           "game_code": "STUDIO-DT-LLWC01BETA",
           "table_code": "beta-t101",
           "shift_code": "SHIFLLWC0102002403200013",
           "ts_start": {
               "seconds": "1710938262",
               "nanos": 635000000
           },
           "is_end": false,
           "ts_end": null
       }
   ]
}
```

### FetchShoeRecord

**说明**：读牌靴记录list（幸运轮不适用）

### FetchLastOneShoeRecord

**说明**：读最新牌靴记录（幸运轮不适用）

### FetchRoundRecord

**说明**：读游戏局号记录list

**请求数据 (Request Message)**：

```json
{
   "round_code": "ROUNLLWC01020024031600010069"
}
```

**返回数据格式**：

```json
{
   "round_record": [
       {
           "tags": [],
           "seats": [
               {
                   "key": 64,
                   "value": {
                       "cards": [
                           {
                               "key": 66,
                               "value": {
                                   "list": [
                                       {
                                           "id": "",
                                           "code": "WHEELBX45",
                                           "index": "0",
                                           "visible": false
                                       }
                                   ],
                                   "patterns": [],
                                   "card_type": ""
                               }
                           }
                       ],
                       "scores": [],
                       "code": 64
                   }
               }
           ],
           "players": [],
           "process": [
               {
                   "actions": [
                       {
                           "cards": [],
                           "scores": [],
                           "code": "",
                           "type": "NONE",
                           "data": null
                       }
                   ],
                   "code": 4,
                   "timestamp": {
                       "seconds": "1710640411",
                       "nanos": 690000000
                   },
                   "bet_step": "ROUND_BET",
                   "duration": "45"
               },
               {
                   "actions": [
                       {
                           "cards": [],
                           "scores": [],
                           "code": "COUNTDOWN",
                           "type": "NONE",
                           "data": null
                       }
                   ],
                   "code": 5,
                   "timestamp": {
                       "seconds": "1710640456",
                       "nanos": 735000000
                   },
                   "bet_step": "NO_MORE_BET",
                   "duration": "45"
               },
               {
                   "actions": [
                       {
                           "cards": [
                               {
                                   "key": 66,
                                   "value": {
                                       "list": [
                                           {
                                               "id": "",
                                               "code": "WHEELBX45",
                                               "index": "0",
                                               "visible": false
                                           }
                                       ],
                                       "patterns": [],
                                       "card_type": ""
                                   }
                               }
                           ],
                           "scores": [],
                           "code": "SPIN",
                           "type": "ADD",
                           "data": null,
                           "source_seat": 0,
                           "target_seat": 64
                       }
                   ],
                   "code": 8,
                   "timestamp": {
                       "seconds": "1710640465",
                       "nanos": 770000000
                   },
                   "bet_step": "SPIN_WHEEL"
               }
           ],
           "medias": {},
           "fortune_rates": [],
           "id": "ZfZNGxM6tc8EUCNQ",
           "supplier": "wecasino-live",
           "game_type": "LUCKYWHEEL",
           "game_subtype": "LUCKYWHEEL_RAINBOW",
           "game_version": "0.2.1",
           "game_code": "STUDIO-LW-LLWC01BETA",
           "table_code": "beta-t204",
           "shift_code": "SHIFLLWC0102002403160001",
           "shift_round": "69",
           "shoe_code": "",
           "shoe_round": "0",
           "round_code": "ROUNLLWC01020024031600010069",
           "ts_start": {
               "seconds": "1710640411",
               "nanos": 495000000
           },
           "bet_step": "BET_STEP_UNSPECIFIED",
           "is_end": true,
           "ts_end": {
               "seconds": "1710640465",
               "nanos": 812000000
           }
       }
   ]
}
```

### FetchLastOneRoundRecord

**说明**：读取最新游戏局号记录

**请求数据 (Request Message)**：

```json
{
   "round_code": "ROUNLLWC01020024031600010069"
}
```

**返回数据格式**：

```json
{
   "round_record": [
       {
           "tags": [],
           "seats": [
               {
                   "key": 64,
                   "value": {
                       "cards": [
                           {
                               "key": 66,
                               "value": {
                                   "list": [
                                       {
                                           "id": "",
                                           "code": "WHEELBX45",
                                           "index": "0",
                                           "visible": false
                                       }
                                   ],
                                   "patterns": [],
                                   "card_type": ""
                               }
                           }
                       ],
                       "scores": [],
                       "code": 64
                   }
               }
           ],
           "players": [],
           "process": [
               {
                   "actions": [
                       {
                           "cards": [],
                           "scores": [],
                           "code": "",
                           "type": "NONE",
                           "data": null
                       }
                   ],
                   "code": 4,
                   "timestamp": {
                       "seconds": "1710640411",
                       "nanos": 690000000
                   },
                   "bet_step": "ROUND_BET",
                   "duration": "45"
               },
               {
                   "actions": [
                       {
                           "cards": [],
                           "scores": [],
                           "code": "COUNTDOWN",
                           "type": "NONE",
                           "data": null
                       }
                   ],
                   "code": 5,
                   "timestamp": {
                       "seconds": "1710640456",
                       "nanos": 735000000
                   },
                   "bet_step": "NO_MORE_BET",
                   "duration": "45"
               },
               {
                   "actions": [
                       {
                           "cards": [
                               {
                                   "key": 66,
                                   "value": {
                                       "list": [
                                           {
                                               "id": "",
                                               "code": "WHEELBX45",
                                               "index": "0",
                                               "visible": false
                                           }
                                       ],
                                       "patterns": [],
                                       "card_type": ""
                                   }
                               }
                           ],
                           "scores": [],
                           "code": "SPIN",
                           "type": "ADD",
                           "data": null,
                           "source_seat": 0,
                           "target_seat": 64
                       }
                   ],
                   "code": 8,
                   "timestamp": {
                       "seconds": "1710640465",
                       "nanos": 770000000
                   },
                   "bet_step": "SPIN_WHEEL"
               }
           ],
           "medias": [],
           "fortune_rates": [],
           "id": "ZfZNGxM6tc8EUCNQ",
           "supplier": "wecasino-live",
           "game_type": "LUCKYWHEEL",
           "game_subtype": "LUCKYWHEEL_RAINBOW",
           "game_version": "0.2.1",
           "game_code": "STUDIO-LW-LLWC01BETA",
           "table_code": "beta-t204",
           "shift_code": "SHIFLLWC0102002403160001",
           "shift_round": "69",
           "shoe_code": "",
           "shoe_round": "0",
           "round_code": "ROUNLLWC01020024031600010069",
           "ts_start": {
               "seconds": "1710640411",
               "nanos": 495000000
           },
           "bet_step": "BET_STEP_UNSPECIFIED",
           "is_end": true,
           "ts_end": {
               "seconds": "1710640465",
               "nanos": 812000000
           }
       }
   ]
}
```

## ProviderService

* 游戏供应商需要暴露的被动接口

``` proto
service ProviderService {
  // 获取实时游戏列表
 rpc FetchGameProvideList(FetchGameProvideListRequest) returns (FetchGameProvideListResponse);

 // 获取单个实时游戏信息
 rpc FetchGameProvide(FetchGameProvideRequest) returns (FetchGameProvideResponse);

 // 读取实时游戏桌信息
 rpc FetchCurrentGame(FetchCurrentGameRequest) returns (FetchCurrentGameResponse);
}
```

### FetchGameProvideList

**说明**：获取实时游戏列表

**请求数据 (Request Message)**：

```json
{
   "platform": "platform-code"
}
```

**返回数据格式**：

```json
{
   "game_provides": [
       {
           "tags": [],
           "players": [],
           "medias": {},
           "live_streams": [],
           "supplier": "wecasino-live",
           "game_type": "LUCKYWHEEL",
           "game_subtype": "LUCKYWHEEL_RAINBOW",
           "game_code": "STUDIO-LW-LLWC01BETA",
           "last_round_code": "",
           "state": "GAME_PROVIDE_CLOSE"
       },
       {
           "tags": [],
           "players": [],
           "medias": {},
           "live_streams": [],
           "supplier": "wecasino-live",
           "game_type": "LUCKYWHEEL",
           "game_subtype": "LUCKYWHEEL_RAINBOW",
           "game_code": "STUDIO-LW-LLWC02BETA",
           "last_round_code": "",
           "state": "GAME_PROVIDE_CLOSE"
       }
   ]
}
```

### FetchGameProvide

**说明**：获取单个实时游戏信息

**请求数据 (Request Message)**：

```json
{
   "game_code": "STUDIO-LW-LLWC01BETA",
   "platform": "platform-code"
}
```

**返回数据格式**：

```json
{
   "game_provide": {
       "tags": [],
       "players": [],
       "medias": {},
       "live_streams": [],
       "supplier": "wecasino-live",
       "game_type": "LUCKYWHEEL",
       "game_subtype": "LUCKYWHEEL_RAINBOW",
       "game_code": "STUDIO-LW-LLWC01BETA",
       "last_round_code": "",
       "state": "GAME_PROVIDE_CLOSE"
   }
}
```

### FetchCurrentGame

**说明**：读取实时游戏桌信息

**请求数据 (Request Message)**：

```json
{
   "game_codes": [
       "STUDIO-LW-LLWC01BETA"
   ]
}
```

**返回数据格式**：

```json
{
   "map_current_games": [
       {
           "key": "STUDIO-LW-LLWC01BETA",
           "value": {
               "medias": {},
               "game_code": "STUDIO-LW-LLWC01BETA",
               "round": {
                   "tags": [],
                   "seats": [],
                   "players": [],
                   "process": [],
                   "medias": {},
                   "fortune_rates": [],
                   "id": "Zfrfg2Iu5EAUgv5S",
                   "supplier": "wecasino-live",
                   "game_type": "LUCKYWHEEL",
                   "game_subtype": "LUCKYWHEEL_RAINBOW",
                   "game_version": "0.2.1",
                   "game_code": "STUDIO-LW-LLWC01BETA",
                   "table_code": "beta-t101",
                   "shift_code": "SHIFLLWC0102002403200014",
                   "shift_round": "49",
                   "shoe_code": "SHOELLWC01020024032000140001",
                   "shoe_round": "49",
                   "round_code": "ROUNLLWC01020024032000140049",
                   "ts_start": {
                       "seconds": "1710940035",
                       "nanos": 921000000
                   },
                   "bet_step": "ROUND_BET",
                   "is_end": false,
                   "ts_end": null
               },
               "shoe": {
                   "decks": [],
                   "id": "",
                   "supplier": "",
                   "game_type": "",
                   "game_subtype": "",
                   "game_version": "",
                   "game_code": "",
                   "table_code": "",
                   "shift_code": "",
                   "shoe_code": "",
                   "ts_start": null,
                   "is_end": false,
                   "ts_end": null
               }
           }
       }
   ],
   "ts": {
       "seconds": "1710940072",
       "nanos": 996075911
   }
}
```
