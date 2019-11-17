const rp = require('request-promise')
const getAccessToken = require('../utils/getAccessToken.js')

const callFunction = async (ctx, fnName, params) => {
  // const ENV = 'clothes-94er3'
  const ACCESS_TOKEN = await getAccessToken()
  const options = {
    method: 'POST',
    uri: `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${ACCESS_TOKEN}&env=${ctx.state.env}&name=${fnName}`,
    body: {
      ...params
    },
    json: true
  }

  return await rp(options)
    .then(res => {
      return res
    })
    .catch(err => {
      throw new Error(err)
    })
}

module.exports = callFunction