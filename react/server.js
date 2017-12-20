const Koa = require('Koa')
const Router = require('koa-router')
const send = require('koa-send')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.dev.config')
const httpProxy = require('http-proxy')
const qenya = require('qenya')
const DEVPORT = 3001


const app = new Koa()
const router = new Router()

qenya({
  appPort:3002,
  apiPort:3003,
  render:function(res){
    if (res.data) {
      return res.data
    }else {
      return{
        err:res.errors[0].message
      }
    }
  }
})
const proxy = new httpProxy.createProxyServer({
    target: 'http://localhost:3003/',
    changeOrigin: true
})
const methods = ['get', 'post', 'put', 'delete']
methods.forEach(m =>
  router[m]('/api/*', function (ctx) {
    proxy.web(ctx.req, ctx.res)
    ctx.body = ctx.res
  })
)
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  quiet: false,
  noInfo: true,
  stats: {
    colors: true
  }
}).listen(DEVPORT, 'localhost', function (err, result) {
  if (err) {
    return console.log(err)
  }
})
router.get('/', async function(ctx){
  await send(ctx,'demo/index.html')
})

//跨域问题
const proxyJs = new httpProxy.createProxyServer({
  target: `http://localhost:${DEVPORT}/`,
  changeOrigin: true
})
router.get('**/*.js(on)?', async function (ctx) {
  proxyJs.web(ctx.req, ctx.res)
  ctx.body = ctx.res
})

router.get('**/react.min.js',async function(ctx){
  await send(ctx,'demo/react-with-addons.js')
})
router.get('**/react-dom.min.js',async function(ctx){
  await send(ctx,'demo/react-dom.js')
})

app.use(router.routes())

app.listen(3000,function(){
  console.log('server running on http://localhost:3000');
})
