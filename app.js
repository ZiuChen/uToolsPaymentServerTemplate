import express from 'express'
import bodyParser from 'body-parser'
import router from './src/router/index.js'

// 创建express实例
const app = express()

// 解析请求体
app.use(bodyParser.json())

// 添加页面路由
app.use(router)

// 监听端口 9000
app.listen(9000, () => {
  console.log('Server is listening on port 9000')
})
