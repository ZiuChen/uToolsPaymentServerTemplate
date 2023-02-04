import dotenv from 'dotenv'

// 加载.env文件到环境变量
dotenv.config()

// 从环境变量中获取插件ID和插件密钥
export const PLUGIN_ID = process.env.PLUGIN_ID
export const SECRET = process.env.PLUGIN_SECRET
