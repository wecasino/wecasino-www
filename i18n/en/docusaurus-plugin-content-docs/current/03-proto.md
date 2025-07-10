---
id: Proto
---

<!-- markdownlint-disable MD033 -->
# Message Format

## Notification Types

### Description

* As the game progresses, different events will occur. When each event occurs, there is a corresponding **notification type** (GameNotifyType) and an **event message**. This message has four message formats: **GameProvide**, **ShiftRecord**, **ShoeRecord**, **RoundRecord**.

### List

| GameNotifyType | Body Message Format | Trigger Time |
|----------------|-------------------|--------------|
| NOTIFY_GAME_PROVIDE_STATE_CHANGE | GameProvide | Notification when game supply status changes |
| NOTIFY_GAME_DEALER_LOGIN | GameProvide | Notification when dealer logs in during game flow |
| NOTIFY_GAME_DEALER_LOGOUT | GameProvide | Notification when dealer logs out during game flow |
| NOTIFY_GAME_CHANGING_SHOE | GameProvide | Notification when shoe changing starts during game flow |
| NOTIFY_SHIFT_START | ShiftRecord | Notification when new shift starts |
| NOTIFY_SHIFT_END | ShiftRecord | Notification when this shift ends |
| NOTIFY_SHOE_START | ShoeRecord | Notification when new shoe starts |
| NOTIFY_SHOE_END | ShoeRecord | Notification when this shoe ends |
| NOTIFY_ROUND_START | RoundRecord | Notification when new round starts |
| NOTIFY_ROUND_BET | RoundRecord | Notification when game round starts betting |
| NOTIFY_ROUND_NO_MORE_BET | RoundRecord | Notification when game round ends betting |
| NOTIFY_ROUND_STEP | RoundRecord | Notification during game round step |
| NOTIFY_ROUND_FINISH | RoundRecord | Notification when game round completes |
| NOTIFY_ROUND_CANCEL | RoundRecord | Notification when game round is cancelled |
| NOTIFY_ROUND_PLAYBACK | RoundRecord | Notification when game round playback is created |

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L284)

## GameProvide

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L391)

* Records current game supply status, dealer, live stream information, etc.

| Field | Type | Description |
|-------|------|-------------|
| supplier | string | Game supplier |
| game_type | string | Game type |
| game_subtype | string | Game subtype |
| game_code | string | Game code |
| tags | map&lt;string, string&gt; | Tags |
| state | GameProvideState | Status |
| players | map&lt;int32, string&gt; | Player seating |
| players_name | map&lt;string, string&gt; | Player names |
| medias | map&lt;string, string&gt; | Additional media: key: media resource code; value: media content. |
| live_streams | map&lt;string, LiveStreamParams&gt; | Live stream parameters |
| last_round_code | string | Last round |

### GameProvideState

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L340)

Game supply status types

| Value | Code | Description |
|-------|------|-------------|
| 0 | GAME_PROVIDE_STATE_UNSPECIFIED | Unspecified |
| 1 | GAME_PROVIDE_AVAILABLE | Available |
| 2 | GAME_PROVIDE_MAINTEN_AFTER_ROUND | Maintenance after this round |
| 3 | GAME_PROVIDE_IN_MAINTENANCE | In maintenance |
| 4 | GAME_PROVIDE_CLOSE_AFTER_ROUND | Close after this round |
| 5 | GAME_PROVIDE_CLOSE | Close after this round |
| 6 | GAME_PROVIDE_AVAILABLE_AFTER_ROUND | Available after this round |

### LiveStreamParams

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L367)

Live stream information, required when composing live stream URL

| Field | Type | Description |
|-------|------|-------------|
| code | string | Stream code |
| app | string | Application |
| channel | string | Channel |

## ShiftRecord

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L279)

Shift record

| Field | Type | Description |
|-------|------|-------------|
| id | bytes | Record ID |
| supplier | string | Game supplier |
| game_type | string | Game type |
| game_subtype | string | Game subtype |
| game_version | string | Game version |
| game_code | string | Game code |
| table_code | string | Table code |
| shift_code | string | Shift code |
| ts_start | google.protobuf.Timestamp | Start time |
| tags | map&lt;string, string&gt; | Tags |
| round_codes | repeated string | Executed game rounds |
| shoe_codes | repeated string | Shuffles |
| is_end | bool | Ended |
| ts_end | google.protobuf.Timestamp | End time |
| test | bool | Is test |

## ShoeRecord

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L242)

Shoe record

| Field | Type | Description |
|-------|------|-------------|
| id | bytes | Record ID |
| supplier | string | Game supplier |
| game_type | string | Game type |
| game_subtype | string | Game subtype |
| game_version | string | Game version |
| game_code | string | Game code |
| table_code | string | Table code |
| shift_code | string | Shift code |
| shoe_code | string | Used shuffle code |
| ts_start | google.protobuf.Timestamp | Time when this shoe starts being used |
| decks | map&lt;int32, Deck&gt; | cardList |
| is_end | bool | This shoe has been used up and cannot be used again |
| ts_end | google.protobuf.Timestamp | Time when shoe usage is completed |
| test | bool | Is test |

### Deck

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L226)

A deck of cards

| Field | Type | Description |
|-------|------|-------------|
| cards | CardList | Cards |
| start_index | int64 | Starting position (after cutting) |
| cut_index | int64 | Cut position |
| index | int64 | Current position |

## RoundRecord

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L152)

Round record

| Field | Type | Description |
|-------|------|-------------|
| id | bytes | Record ID |
| supplier | string | Game supplier |
| game_type | string | Game type |
| game_subtype | string | Game subtype |
| game_version | string | Game version |
| game_code | string | Game code |
| table_code | string | Table code |
| shift_code | string | Shift code |
| shift_round | int64 | Round number in this shift |
| shoe_code | string | Used shoe code |
| shoe_round | int64 | Which round using this shuffle, counting from 1 |
| round_code | string | Round code |
| tags | map&lt;string, string&gt; | Tags |
| ts_start | google.protobuf.Timestamp | Start time |
| bet_step | BetStep | Betting status |
| seats | map&lt;int32, Seat&gt; | Seat groups |
| players | map&lt;int32, string&gt; | Player seating |
| players_name | map&lt;string, string&gt; | Player names |
| process | repeated Step | History |
| is_end | bool | Ended |
| ts_end | google.protobuf.Timestamp | End time |
| cancel | bool | Cancelled |
| cancel_code | string | Cancel code: CancelReasonCode |
| cancel_message | string | Cancel remarks |
| win_type | map&lt;int32, games.WinType&gt; | Winners |
| medias | map&lt;string, string&gt; | Additional media: key: media resource code; value: media content. |
| fortune_rates | map&lt;string, int64&gt; | Fortune rates |
| test | bool | Is test |

### BetStep

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L88)

Betting step

| Value | Code | Description |
|-------|------|-------------|
| 0 | BET_STEP_UNSPECIFIED | Unspecified, this step is unrelated to betting |
| 1 | ROUND_BET | Start betting |
| 3 | NO_MORE_BET | Stop betting |
| 4 | CARD | Card changes |

### Seat

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L123)

Seat

| Field | Type | Description |
|-------|------|-------------|
| code | int32 | Seat function code: SeatCode |
| cards | map&lt;int32, CardList&gt; | Various hand cards |

### Step

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L102)

Game step

| Field | Type | Description |
|-------|------|-------------|
| code | int32 | Step code: StepCode |
| seat | int32 | Player, executor: SeatCode |
| timestamp | google.protobuf.Timestamp | Timestamp |
| actions | repeated StepAction | Execution actions |
| error | string | Execution error |
| cancel | bool | Cancelled |
| duration | int64 | Allocated milliseconds |
| bet_step | BetStep | Betting action |

### StepAction

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L66)

Execution action: add, delete, or transfer certain resources

| Field | Type | Description |
|-------|------|-------------|
| code | string | Action description code |
| type | StepActionType | Action type |
| source_seat | int32 | Resource owner seat. |
| target_seat | int32 | Resource transfer target seat. |
| cards | map&lt;int32, CardList&gt; | Target card resources |
| data | google.protobuf.Any | (Optional) Additional data |

### StepActionType

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L45)

Action type

| Value | Code | Description |
|-------|------|-------------|
| 0 | STEP_ACTION_TYPE_UNSPECIFIED | Unspecified |
| 1 | ADD | Deal resources |
| 2 | SET | Set specified resources |
| 3 | SETALL | Overwrite all resources |
| 4 | REMOVE | Remove resources from the field |
| 5 | READ | Read card data |
| 6 | READ_UNVISIBLE | Read cards but not visible |
| 7 | TRANSFER | Transfer resources |
| 8 | VISIBLE | Card front and back |
| 9 | STATUS | Card status change |
| 10 | NONE | This step does not need to modify resources |
| 11 | WIN | Determine win/loss |

### CardList

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L33)

Card list

| Field | Type | Description |
|-------|------|-------------|
| card_type | string |  |
| list | repeated Card | List |
| pattern | int32 | Hand pattern |

### Card

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L12)

Card, represents various items used in this round

| Field | Type | Description |
|-------|------|-------------|
| id | string | Card ID: unique card code |
| code | string | Card code |
| index | int64 | Order |
| visible | bool | Visible |
| status | int64 | Horizontal, vertical... |
| plain_text | string | Plain text |
| signature | string | Signature |
| sign_algorithm | string | Signature method | 