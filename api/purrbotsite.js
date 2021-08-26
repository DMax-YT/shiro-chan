const axios = require("axios").default;
const apiBase = axios.create({
  baseURL: "https://purrbot.site/api/img/",
  transformResponse: [(data) => JSON.parse(data).link],
});
const buildRouter = require("./routerBuilder");

const routes = {
  bite: "sfw/bite",
  blush: "sfw/blush",
  cry: "sfw/cry",
  cuddle: "sfw/cuddle",
  dance: "sfw/dance",
  feed: "sfw/feed",
  hug: "sfw/hug",
  kiss: "sfw/kiss",
  lick: "sfw/lick",
  pat: "sfw/pat",
  poke: "sfw/poke",
  slap: "sfw/slap",
  smile: "sfw/smile",
  tickle: "sfw/tickle",

  anal: "nsfw/anal",
  blowjob: "nsfw/blowjob",
  cum: "nsfw/cum",
  fuck: "nsfw/fuck",
  pussylick: "nsfw/pussylick",
};

module.exports = buildRouter(apiBase, routes, "/gif");
