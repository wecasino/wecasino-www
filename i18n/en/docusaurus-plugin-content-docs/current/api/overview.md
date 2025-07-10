<!-- markdownlint-disable MD033 -->
# System Overview

## Data Content

This API provides table-based subscription to game table data, where each table can be subscribed to separately. Each table provides two main categories: "Management Data" and "Game Data":

**Management Data** includes management-related operations such as opening tables, closing tables, maintenance, and cover photo updates.

**Game Data** includes shift, shoe, and round data, as well as records of each action such as dealing cards and rolling dice.

## Interface Categories

All data in this API is provided through two methods: "Active Push" and "Passive Query":

**Active Push**: Subscribe to our AMQP interface, and event notifications are sent immediately when events occur.

**Passive Query**: After events occur, data can be retrieved through gRPC / HTTP API.

## Data Structure

All data content is divided into the following four object types:

- **GameProvide (Game Table)**: Management data
- **ShiftRecord (Shift)**: Information about the game shift
- **ShoeRecord (Shoe)**: Information about the shoe
- **RoundRecord (Round)**: Information about the round

## Data Flow

``` txt
Game Table (GameProvide)
    ↓
Shift (ShiftRecord)
    ↓
Shoe (ShoeRecord) [Some games may not have this]
    ↓
Round (RoundRecord)
```

A shift typically contains multiple shoes, and one shoe can have multiple rounds. For games without shoes, there will only be shift and round data, with one shift containing multiple rounds.

## Important Notes

1. All data has timestamps for easy tracking and querying 