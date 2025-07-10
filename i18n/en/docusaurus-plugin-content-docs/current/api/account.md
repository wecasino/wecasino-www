<!-- markdownlint-disable MD033 -->
# Apply for Operator Account

## Application Process

1. Contact WE technical support team
2. Provide necessary company information
3. Wait for approval
4. Receive operator account information

## Required Information

After successful application, you will receive the following information:

| Item | Description |
|------|-------------|
| Platform Code | Operator code used to identify your platform |
| Notify API URL | AMQP protocol push interface address for receiving real-time notifications |
| Provider API URL | gRPC/HTTP protocol query interface address for querying data |
| Provider HTTP Secret | Secret used for HTTP API call authentication |

## Security Considerations

1. Please keep your Provider HTTP Secret secure
2. Do not share the Secret with unauthorized personnel
3. It is recommended to use HTTPS for API calls

## Whitelist Mechanism

1. After approval, your IP will be added to the whitelist
2. Only IPs in the whitelist can call the API
3. If you need to add new IPs, please contact the technical support team 