const rp = require('request-promise')
const fs = require('fs')

const APPID = 'wx9a429f853aa9758d'
const APPSECRET = '4b567902eadbcc147fb6611630ed7314'
const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`

const path = require('path')
const fileName = path.resolve(__dirname, './access_token.json')

const updateAccessToken = async () => {
  const resStr = await rp(URL)
  const res = JSON.parse(resStr)
  // 写文件
  if(res.access_token) {
    fs.writeFileSync(fileName, JSON.stringify({
      access_token: res.access_token,
      createTime: new Date()
    }))
  }else {
    updateAccessToken()
  }
}

const getAccessToken = async () => {
  // 读取文件
  try {
    const readRes = fs.readFileSync(fileName, 'utf8')
    const readObj = JSON.parse(readRes)
    const createTime = new Date(readObj.createTime).getTime()
    if((new Date().getTime() - createTime) / 1000 / 60 / 60 >= 2) {
      await updateAccessToken()
      await getAccessToken()
    }
    return readObj.access_token
  }catch {
    await updateAccessToken()
    await getAccessToken()
  }
}

setInterval(async () => {
  await updateAccessToken()
}, 7200 * 1000 - 5 * 60 * 1000)

module.exports = getAccessToken