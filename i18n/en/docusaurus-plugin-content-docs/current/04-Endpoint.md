<!-- markdownlint-disable MD033 -->
# API Endpoints

## Notify API Interface

### AMQP

1. Notify API uses AMQP protocol. After merchants register subscriptions to the port, all subscribed table game events will be sent immediately when they occur.
2. Each operator account will have an independent Queue as cache, which will not be shared with other operators. Operator programs should keep the Queue empty at all times, so data can be transmitted immediately.
3. If the operator has maintenance or other events and cannot process messages in time, after the system recovers, all cached events during this period in the Queue will be received.
4. Notification type (GameNotifyType) will be placed in the **Type** field of the AMQP standard packet, as well as in the **Header**
5. Message objects are compressed into Binary using grpc and placed in the **Body** field of the AMQP standard packet
6. When receiving packets, the operator system can parse the **Body** field correctly with the corresponding format according to the **Type** field to obtain the message object.

### Examples

1. golang amqp091 package parsing example

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

2. Complete example [Github](https://github.com/wecasino/wecasino-demo-backend-go/blob/main/queue/queue.go#L122)

## Provider API Query Interface

### gRPC Interface

1. Provider API uses proto-defined service and exposes gRPC interface externally.
2. proto can be found in our [GITHUB](https://github.com/wecasino/wecasino-proto/tree/main/protos)

### HTTP API

1. Provider API also provides HTTP API method.
2. HTTP API please refer to [Swagger](https://api-doc.beta.wecasino.live)

### Time Limit

1. Provider API provides records for the last 7 days

## Recorder Service

1. proto[Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/recorder.proto#L206)

### FetchShiftRecord

**Description**: Read shift record list

**Request Data (Request Message)**:

```json
{
   "game_code": "STUDIO-LW-LLWC01BETA"
}
```

**Response Data Format**:

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

**Description**: Read latest shift record

**Request Data (Request Message)**:

```json
{
   "game_code": "STUDIO-LW-LLWC01BETA"
}
```

**Response Data Format**:

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

**Description**: Read shoe record list (not applicable to Lucky Wheel)

### FetchLastOneShoeRecord

**Description**: Read latest shoe record (not applicable to Lucky Wheel)

### FetchRoundRecord

**Description**: Read game round record list

**Request Data (Request Message)**:

```json
{
   "round_code": "ROUNLLWC01020024031600010069"
}
```

**Response Data Format**:

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

**Description**: Read latest game round record

**Request Data (Request Message)**:

```json
{
   "round_code": "ROUNLLWC01020024031600010069"
}
```

**Response Data Format**:

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

* Passive interface that game suppliers need to expose

``` proto
service ProviderService {
  // Get real-time game list
 rpc FetchGameProvideList(FetchGameProvideListRequest) returns (FetchGameProvideListResponse);

 // Get single real-time game information
 rpc FetchGameProvide(FetchGameProvideRequest) returns (FetchGameProvideResponse);

 // Read real-time game table information
 rpc FetchCurrentGame(FetchCurrentGameRequest) returns (FetchCurrentGameResponse);
}
```

### FetchGameProvideList

**Description**: Get real-time game list

**Request Data (Request Message)**:

```json
{
   "platform": "platform-code"
}
```

**Response Data Format**:

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

**Description**: Get single real-time game information

**Request Data (Request Message)**:

```json
{
   "game_code": "STUDIO-LW-LLWC01BETA",
   "platform": "platform-code"
}
```

**Response Data Format**:

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

**Description**: Read real-time game table information

**Request Data (Request Message)**:

```json
{
   "game_codes": [
       "STUDIO-LW-LLWC01BETA"
   ]
}
```

**Response Data Format**:

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