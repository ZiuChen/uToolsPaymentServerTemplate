import fetch from 'node-fetch'
import { generateSignature, obj2param, PLUGIN_ID, PLUGIN_SECRET } from './index.js'

/**
 * 获取用户信息
 * @param {*} token 用户授权码 从uTools客户端生成
 * @returns Promise<UserInfo>
 */
export async function fetchUserInfo(token) {
  // 组装原始数据
  const data = {
    access_token: token,
    plugin_id: PLUGIN_ID,
    timestamp: new Date().getTime().toString().substring(0, 10)
  }

  // 对原始数据进行签名
  data.sign = generateSignature(data, PLUGIN_SECRET)

  const url = 'https://open.u-tools.cn/baseinfo?' + obj2param(data)

  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
    .then((res) => res.json())
    .catch((err) => console.err('Error: ' + err))
}
