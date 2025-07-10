<!-- markdownlint-disable MD033 -->
# Message Format

## Notification Types

### Description

* As the game progresses, different events occur. When each event occurs, there is a corresponding **Notification Type** (GameNotifyType) and an **Event Message**. The message has four formats in total: **GameProvide**, **ShiftRecord**, **ShoeRecord**, **RoundRecord**.

### List

| GameNotifyType | body Message Format | Trigger Time |
|----------------|---------------------|--------------|
| NOTIFY_GAME_PROVIDE_STATE_CHANGE | GameProvide | Notify when game supply status changes |
| NOTIFY_GAME_DEALER_LOGIN | GameProvide | Notify when game dealer logs in |
| NOTIFY_GAME_DEALER_LOGOUT | GameProvide | Notify when game dealer logs out |
| NOTIFY_GAME_CHANGING_SHOE | GameProvide | Notify when game starts changing shoe |
| NOTIFY_SHIFT_START | ShiftRecord | Notify when new shift starts |
| NOTIFY_SHIFT_END | ShiftRecord | Notify when shift ends |
| NOTIFY_SHOE_START | ShoeRecord | Notify when new shoe starts |
| NOTIFY_SHOE_END | ShoeRecord | Notify when shoe ends |
| NOTIFY_ROUND_START | RoundRecord | Notify when new round starts |
| NOTIFY_ROUND_BET | RoundRecord | Notify when round betting starts |
| NOTIFY_ROUND_NO_MORE_BET | RoundRecord | Notify when round betting ends |
| NOTIFY_ROUND_STEP | RoundRecord | Notify when round step proceeds |
| NOTIFY_ROUND_FINISH | RoundRecord | Notify when round completes |
| NOTIFY_ROUND_CANCEL | RoundRecord | Notify when round is cancelled |
| NOTIFY_ROUND_PLAYBACK | RoundRecord | Notify when round playback is created |

* proto[Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L284)

## GameProvide

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L391)

* Records current game supply status, dealer, live stream information, etc.

| Field | Type | Description |
|-------|------|-------------|
| supplier | string | Game supplier |
| game_type | string | Game type |
| game_subtype | string | Game subtype |
| game_code | string | Game code |
| tags | map<string, string> | Tags |
| state | GameProvideState | Status |
| players | map<int32, string> | Player seating |
| players_name | map<string, string> | Player names |
| medias | map<string, string> | Additional media: key: media resource code; value: media content |
| live_streams | map<string, LiveStreamParams> | Live stream parameters |
| last_round_code | string | Last round |

### GameProvideState

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L340)

Game supply status types

| Value | Code | Description |
|-------|------|-------------|
| 0 | GAME_PROVIDE_STATE_UNSPECIFIED | Unspecified |
| 1 | GAME_PROVIDE_AVAILABLE | Available |
| 2 | GAME_PROVIDE_MAINTEN_AFTER_ROUND | Maintenance after this round |
| 3 | GAME_PROVIDE_IN_MAINTENANCE | Under maintenance |
| 4 | GAME_PROVIDE_CLOSE_AFTER_ROUND | Close after this round |
| 5 | GAME_PROVIDE_CLOSE | Closed |
| 6 | GAME_PROVIDE_AVAILABLE_AFTER_ROUND | Available after this round |

### LiveStreamParams

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/provider.proto#L367)

Live stream information needed for composing live stream URLs

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
| tags | map<string, string> | Tags |
| round_codes | repeated string | Executed game rounds |
| shoe_codes | repeated string | Shoes |
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
| shoe_code | string | Shoe code used |
| ts_start | google.protobuf.Timestamp | Shoe start time |
| decks | map<int32, Deck> | Card list |
| is_end | bool | Shoe is finished and cannot be used |
| ts_end | google.protobuf.Timestamp | Shoe finish time |
| test | bool | Is test |

### Deck

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L226)

A deck of cards

| Field | Type | Description |
|-------|------|-------------|
| cards | CardList | Cards |
| start_index | int64 | Start position (after cut) |
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
| shift_round | int64 | Shift round number |
| shoe_code | string | Shoe code used |
| shoe_round | int64 | Round number in this shoe, starting from 1 |
| round_code | string | Round code |
| tags | map<string, string> | Tags |
| ts_start | google.protobuf.Timestamp | Start time |
| bet_step | BetStep | Betting status |
| seats | map<int32, Seat> | Seat groups |
| players | map<int32, string> | Player seating |
| players_name | map<string, string> | Player names |
| process | repeated Step | Process |
| is_end | bool | Ended |
| ts_end | google.protobuf.Timestamp | End time |
| cancel | bool | Cancelled |
| cancel_code | string | Cancel code: CancelReasonCode |
| cancel_message | string | Cancel note |
| win_type | map<int32, games.WinType> | Winner |
| medias | map<string, string> | Additional media: key: media resource code; value: media content |
| fortune_rates | map<string, int64> | Fortune rates |
| test | bool | Is test |

### BetStep

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L88)

Betting step

| Value | Code | Description |
|-------|------|-------------|
| 0 | BET_STEP_UNSPECIFIED | Unspecified, this step is not related to betting |
| 1 | ROUND_BET | Start betting |
| 3 | NO_MORE_BET | Stop betting |
| 4 | CARD | Card change |

### Seat

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L123)

Seat

| Field | Type | Description |
|-------|------|-------------|
| code | int32 | Seat function code: SeatCode |
| cards | map<int32, CardList> | Various hand cards |

### Step

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L102)

Game step

| Field | Type | Description |
|-------|------|-------------|
| code | int32 | Step code: StepCode |
| seat | int32 | Player, executor: SeatCode |
| timestamp | google.protobuf.Timestamp | Timestamp |
| actions | repeated StepAction | Executed actions |
| error | string | Execution error |
| cancel | bool | Cancelled |
| duration | int64 | Allocated milliseconds |
| bet_step | BetStep | Betting action |

### StepAction

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L66)

Executed action: add, delete, transfer certain resources

| Field | Type | Description |
|-------|------|-------------|
| code | string | Action description code |
| type | StepActionType | Action type |
| source_seat | int32 | Resource owning seat |
| target_seat | int32 | Resource transfer target seat |
| cards | map<int32, CardList> | Target card resources |
| data | google.protobuf.Any | (Optional) Additional data |

### StepActionType

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L45)

Action type

| Value | Code | Description |
|-------|------|-------------|
| 0 | STEP_ACTION_TYPE_UNSPECIFIED | Unspecified |
| 1 | ADD | Deal resources |
| 2 | SET | Set specified resources |
| 3 | SETALL | Rewrite all resources |
| 4 | REMOVE | Remove resources from field |
| 5 | READ | Read card data |
| 6 | READ_UNVISIBLE | Read card but invisible |
| 7 | TRANSFER | Transfer resources |
| 8 | VISIBLE | Card face up/down |
| 9 | STATUS | Card status change |
| 10 | NONE | This step does not modify resources |
| 11 | WIN | Determine win/loss |

### CardList

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L33)

Card list

| Field | Type | Description |
|-------|------|-------------|
| card_type | string |  |
| list | repeated Card | List |
| pattern | int32 | Card pattern |

### Card

* proto [Github](https://github.com/wecasino/wecasino-proto/blob/b9754ac21f42c9ee342f6875d26576f5ac64626c/protos/recorder/record.proto#L12)

Card, representing various items used in this round

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

## Common Parameters

* This API data format is common to various game types, so many fields will change depending on the game.
* However, many games are similar, so some common parameters are defined that each game can use directly.

### Seats

* "Seats" represent players, dealers, banker, player, or any place where cards may belong in the game

* Common seat values

| Value | Code | Description |
|-------|------|-------------|
| 0 | SEAT_UNSPECIFIED | Unspecified |
| 64 | DEALER | Dealer |
| 65 | PREVIOUS_DEALER | Previous Dealer |
| 66 | PITBOSS | Pit Boss |
| 67 | PREVIOUS_PITBOSS | Previous Pit Boss |
| 68 | PLAYER | Player |
| 69 | BANKER | Banker |
| 70 | LEFT | Left |
| 71 | RIGHT | Right |
| 96 | CONTROL | Flow Control Card |
| 99 | Instructions | Player Instructions |

### Resource Types

* "Resource Type" indicates the possible classification of these cards. For example: in Baccarat, seat: Player has two resources: "natural cards" and "third card"

| Value | Code | Description |
|-------|------|-------------|
| 0 | RESOURCE_TYPE_UNSPECIFIED | Unspecified |
| 64 | SHOE | Shoe |
| 65 | HAND | Hand |
| 66 | FIELD | Field |
| 67 | FIRST_CARD | First Card |
| 68 | SHOE_CUT | Cut Card |
| 69 | DISCARD | Discard |

### Win/Loss

* Record win/loss results

| Value | Code | Description |
|-------|------|-------------|
| 0 | WIN_TYPE_UNSPECIFIED | Unspecified |
| 1 | LOSE | Lose |
| 2 | WIN | Win |
| 3 | TIE | Tie |

### Poker Cards

| Spade Cards | Heart Cards | Club Cards | Diamond Cards | Description |
|-------------|-------------|------------|---------------|-------------|
| SPADE_A | HEART_A | CLUB_A | DIAMOND_A | 1 Point |
| SPADE_2 | HEART_2 | CLUB_2 | DIAMOND_2 | 2 Points |
| SPADE_3 | HEART_3 | CLUB_3 | DIAMOND_3 | 3 Points |
| SPADE_4 | HEART_4 | CLUB_4 | DIAMOND_4 | 4 Points |
| SPADE_5 | HEART_5 | CLUB_5 | DIAMOND_5 | 5 Points |
| SPADE_6 | HEART_6 | CLUB_6 | DIAMOND_6 | 6 Points |
| SPADE_7 | HEART_7 | CLUB_7 | DIAMOND_7 | 7 Points |
| SPADE_8 | HEART_8 | CLUB_8 | DIAMOND_8 | 8 Points |
| SPADE_9 | HEART_9 | CLUB_9 | DIAMOND_9 | 9 Points |
| SPADE_10 | HEART_10 | CLUB_10 | DIAMOND_10 | 10 Points |
| SPADE_J | HEART_J | CLUB_J | DIAMOND_J | 11 Points |
| SPADE_Q | HEART_Q | CLUB_Q | DIAMOND_Q | 12 Points |
| SPADE_K | HEART_K | CLUB_K | DIAMOND_K | 13 Points |

### Dice

| Value | Code | Description |
|-------|------|-------------|
| 0 | DICE_CARD_UNSPECIFIED | Unspecified |
| 1 | DICE_1 | 1 Point |
| 2 | DICE_2 | 2 Points |
| 3 | DICE_3 | 3 Points |
| 4 | DICE_4 | 4 Points |
| 5 | DICE_5 | 5 Points |
| 6 | DICE_6 | 6 Points |

### Lucky Wheel

| Value | Code | Description |
|-------|------|-------------|
| 0 | WHEEL_UNSPECIFIED | Unspecified |
| 1 | WHEEL24X1 | 24 Grids 1x |
| 2 | WHEEL12X3 | 12 Grids 3x |
| 3 | WHEEL8X5 | 8 Grids 5x |
| 4 | WHEEL4X10 | 4 Grids 10x |
| 5 | WHEEL2X20 | 2 Grids 20x |
| 6 | WHEELAX45 | 1 Grid 45x |
| 7 | WHEELBX45 | 1 Grid 45x | 