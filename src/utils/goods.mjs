import fetch from 'node-fetch'
import { generateSignature, obj2param, PLUGIN_ID, PLUGIN_SECRET } from './index.mjs'

/**
 * 动态创建商品
 * @param {*} fee 商品价格 单位(分)
 * @param {*} title 商品名称
 * @returns Promise<GoodsInfo>
 */
export async function createGoods(fee, title) {
  // 组装原始数据
  const data = {
    plugin_id: PLUGIN_ID,
    total_fee: fee,
    title: title,
    timestamp: new Date().getTime().toString().substring(0, 10)
  }

  // 对原始数据进行签名
  data.sign = generateSignature(data, PLUGIN_SECRET)

  const url = 'https://open.u-tools.cn/goods?' + obj2param(data)

  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    }
  })
    .then((res) => res.json())
    .catch((err) => console.err('Error: ' + err))
}
