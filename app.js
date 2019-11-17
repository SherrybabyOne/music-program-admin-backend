const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const koaBody = require('koa-body')

const app = new Koa()
const router = new Router()

const ENV = 'clothes-94er3'

// 跨域
app.use(cors({
  origin: ['http://localhost:9528'],
  credentials: true
}))

// 接收post参数解析
app.use(koaBody({
  multipart: true
}))

app.use(async (ctx, next) => {
  ctx.state.env = ENV
  await next()
})

const playlist = require('./controller/playlist.js')
router.use('/playlist', playlist.routes())

app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000, () => {
  console.log('服务开启在3000端口')
})

// MVC模型视图控制器