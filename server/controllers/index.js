const Router = require("koa-router");

const router = new Router();

const media = [{
  image: true,
  src: 'moon.jpg'
}, {
  image: true,
  src: 'fire.jpg'
}, {
  image: true,
  src: 'lighter.jpg'
}, {
  video: true,
  src: 'jellyfish1.mp4'
}, {
  video: true,
  src: 'jellyfish2.mp4'
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
    image: selectedMedia.image,
    video: selectedMedia.video,
    mediaSrc: selectedMedia.src,
    prevIndex,
    nextIndex,
  });
});

module.exports = router;
