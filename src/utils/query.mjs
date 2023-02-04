import fetch from 'node-fetch'
import { generateSignature, obj2param, PLUGIN_ID, SECRET } from './index.mjs'

/**
 * 查询订单支付状态
 * @param {*} orderId 第三方订单号
 * @returns Promise<PaymentInfo>
 */
export async function queryPayment(orderId) {
  // 组装原始数据
  const data = {
    plugin_id: PLUGIN_ID,
    out_order_id: orderId,
    timestamp: new Date().getTime().toString().substring(0, 10)
  }

  // 对原始数据进行签名
  data.sign = generateSignature(data, SECRET)

  const url = 'https://open.u-tools.cn/payments/record?' + obj2param(data)

  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
    .then((res) => res.json())
    .catch((err) => console.err('Error: ' + err))
}
