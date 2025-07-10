---
id: Apply
---
<!-- markdownlint-disable MD033 -->
# 申請營運商帳戶

## 申請流程

1. 聯繫 WE 技術支援團隊
2. 提供必要的公司資料
3. 等待審核通過
4. 取得營運商帳戶資訊

## 必要資訊

申請成功後，您將獲得以下資訊：

| 項目 | 說明 |
|------|------|
| Platform Code | 營運商代碼，用於識別您的平台 |
| Notify API URL | AMQP 協議的推播接口地址，用於接收即時通知 |
| Provider API URL | gRPC/HTTP 協議的查詢接口地址，用於查詢資料 |
| Provider HTTP Secret | HTTP API 呼叫認證時使用的 secret |

## 安全注意事項

1. 請妥善保管您的 Provider HTTP Secret
2. 不要將 Secret 分享給未授權的人員
3. 建議使用 HTTPS 進行 API 呼叫

## 白名單機制

1. 申請通過後，您的 IP 將被加入白名單
2. 只有白名單內的 IP 才能呼叫 API
3. 如需新增 IP，請聯繫技術支援團隊
