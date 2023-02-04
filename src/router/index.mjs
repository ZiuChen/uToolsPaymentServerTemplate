import express from 'express'
import { generateSignature, PLUGIN_SECRET } from '../utils/index.mjs'

const Router = express.Router
const router = new Router()

/**
 * @description: 支付成功回调地址
 */
router.get('/payment', async (req, res) => {
  const { resource, sign } = req.body

  if (!resource || !sign) {
    res.status(404).send('PARAM_ERROR')
    return
  }

  // 验证签名
  const signature = generateSignature(resource, PLUGIN_SECRET)
  if (signature !== sign) {
    res.status(404).send('SIGNATURE_ERROR')
    return
  }

  // 处理支付成功逻辑
  res.send('SUCCESS')
})

export default router
