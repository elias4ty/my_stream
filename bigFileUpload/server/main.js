const Koa = require('koa');
const Router = require('koa-router');
// const bodypaser = require('koa-bodyparser');
const { koaBody } = require('koa-body');
const upload = require('./files');

const app = new Koa();
const router = new Router();


app.use(koaBody({
  multipart: true
}));

router.post('/upload', upload());
app.use(router.middleware());

app.listen(6666, () => {
  console.log('listen at 6666');
});