# uTools支付服务器模板

- 使用`dotenv`从`.env`文件读取环境变量`PLUGIN_ID`与`PLUGIN_SECRET`
- 默认支付成功回调地址为`http://xxxxxxxxxxx:9000/payment` 支持签名生成与验证
- 代码模块化方案采用 ESModule

接口列表

- 支付成功回调
- 查询用户信息
- 查询订单状态
- 动态创建商品
