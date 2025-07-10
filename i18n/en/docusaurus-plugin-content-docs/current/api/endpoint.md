<!-- markdownlint-disable MD033 -->
# API Endpoints

## Notify API Interface

### AMQP

1. Notify API uses AMQP protocol. After merchants register subscription to the port, all subscribed table game events will be sent immediately when they occur.
2. Each operator account has an independent Queue as buffer, not shared with other operators. Operator programs should keep the Queue empty so data can be delivered immediately.
3. If operators have maintenance or other events preventing timely message consumption, after system recovery, they will receive all cached events in the Queue during that period.
4. Notification type (GameNotifyType) is placed in the **Type** field of AMQP standard packet, as well as in **Header**
5. Message objects are compressed as Binary using grpc and placed in the **Body** field of AMQP standard packet
6. Operator systems can parse the **Body** field correctly using the corresponding format based on the **Type** field when receiving packets to obtain message objects.

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

1. Provider API uses proto-defined service and provides external grpc interface.
2. Proto can be found in our [GITHUB](https://github.com/wecasino/wecasino-proto/tree/main/protos)

### HTTP API

1. Provider API also provides HTTP API method.
2. For HTTP API details, please refer to [Swagger](https://api-doc.beta.wecasino.live)

### Time Limit

1. Provider API provides last 7 days query records

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

**Description**: Read shoe record list (not applicable for Lucky Wheel)

### FetchLastOneShoeRecord

**Description**: Read latest shoe record (not applicable for Lucky Wheel)

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
``` 