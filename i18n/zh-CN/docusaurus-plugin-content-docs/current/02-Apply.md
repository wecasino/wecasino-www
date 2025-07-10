---
id: Apply
---
<!-- markdownlint-disable MD033 -->
# 申请运营商账户

## 申请流程

1. 联系 WE 技术支持团队
2. 提供必要的公司资料
3. 等待审核通过
4. 取得运营商账户信息

## 必要信息

申请成功后，您将获得以下信息：

| 项目 | 说明 |
|------|------|
| Platform Code | 运营商代码，用于识别您的平台 |
| Notify API URL | AMQP 协议的推送接口地址，用于接收实时通知 |
| Provider API URL | gRPC/HTTP 协议的查询接口地址，用于查询数据 |
| Provider HTTP Secret | HTTP API 调用认证时使用的 secret |

## 安全注意事项

1. 请妥善保管您的 Provider HTTP Secret
2. 不要将 Secret 分享给未授权的人员
3. 建议使用 HTTPS 进行 API 调用

## 白名单机制

1. 申请通过后，您的 IP 将被加入白名单
2. 只有白名单内的 IP 才能调用 API
3. 如需新增 IP，请联系技术支持团队
