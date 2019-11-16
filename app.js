const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const playlist = require('./controller/playlist.js')
router.use('/playlist', playlist.routes())

app.use(router.routes())
app.use(router.allowedMethods())

app.use(async (ctx, next) => {
  ctx.body = 'Hello World'
})

app.listen(3000, () => {
  console.log('服务开启在3000端口')
})

// MVC模型视图控制器