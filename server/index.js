const path = require('path');
const Koa = require('koa');
const hbs = require('koa-hbs');
const serve = require('koa-static');

const app = new Koa();

const port = process.env.PORT || 80;

// eslint-disable-next-line global-require
app.use(require('koa-logger')());

app.use(
  hbs.middleware({
    viewPath: path.resolve(__dirname, './views')
  })
);

require('./bootstrap')().then(() => {
  // eslint-disable-next-line
  const controllers = require('./controllers');
  app.use(controllers.routes());
  app.use(controllers.allowedMethods());

  app.use(serve(path.resolve(__dirname, 'public')));

  app.listen(port, () => {
    console.info(`Server listening on ${port}`);
  });
});
