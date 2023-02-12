import crypto from 'crypto'

/**
 * 工具函数：将对象转换为 URL 参数形式的字符串
 * @param {*} obj 原始对象
 * @returns 处理后的字符串
 */
export function obj2param(obj) {
  // 对参数内容进行 url_encode 编码后，组合成 URL 参数形式的字符串
  const param = Object.keys(obj)
    .map(
      (key) =>
        // 将空格(%20)转换为加号(+)
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]).replace(/%20/g, '+')
    )
    .join('&')
  return param
}

/**
 * 对数据进行签名
 * @param {*} data 签名原始数据
 * @param {*} secret 插件密钥
 * @returns 签名结果
 */
export function generateSignature(data, secret) {
  // 对请求参数按参数名升序排序
  const sortedData = Object.keys(data)
    .sort()
    .reduce((acc, key) => {
      acc[key] = data[key]
      return acc
    }, {})
  // 对参数内容进行 url_encode 编码后，组合成 URL 参数形式的字符串
  const param = obj2param(sortedData)
  // 使用 HMAC-SHA256 算法，对上一步生成的字符串进行签名
  const sign = crypto.createHmac('sha256', secret).update(param).digest('hex')
  return sign
}
