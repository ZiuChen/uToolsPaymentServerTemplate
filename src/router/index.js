import { Router } from 'express'
import { generateSignature, PLUGIN_SECRET } from '../utils/index.js'

// 实例化路由对象
const router = new Router()

/**
 * @description: 支付成功回调地址
 */
router.post('/payment', async (req, res) => {
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
