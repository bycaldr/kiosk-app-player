const Router = require("koa-router");

const router = new Router();

const media = [{
  type: 'image',
  src: 'moon.jpg'
}, {
  type: 'image',
  src: 'fire.jpg'
}, {
  type: 'image',
  src: 'lighter.jpg'
}]

router.get("/", async (ctx) => {
  let index = ctx.query.index ? Number(ctx.query.index) : 0;
  if (Number.isNaN(index)) index = 0;

  let selectedMedia = media[index];
  if (!selectedMedia) {
    selectedMedia = media[0];
  }

  let prevIndex = index - 1;
  if (prevIndex < 0) prevIndex = media.length - 1;

  let nextIndex = index + 1;
  if (nextIndex > media.length - 1) nextIndex = 0;

  await ctx.render("index", {
    type: selectedMedia.type,
    mediaSrc: selectedMedia.src,
    prevIndex,
    nextIndex,
  });
});

module.exports = router;
