const axios = require("axios").default;
const apiBase = axios.create({
  baseURL: "https://nekos.best/api/v2/",
  transformResponse: [(data) => JSON.parse(data).results[0].url],
});
const buildRouter = require("./routerBuilder");

const routes = {
  bite: "bite",
  blush: "blush",
  bored: "bored",
  cry: "cry",
  cuddle: "cuddle",
  dance: "dance",
  facepalm: "facepalm",
  feed: "feed",
  happy: "happy",
  highfive: "highfive",
  hug: "hug",
  kiss: "kiss",
  laugh: "laugh",
  pat: "pat",
  poke: "poke",
  pout: "pout",
  shrug: "shrug",
  slap: "slap",
  sleep: "sleep",
  smile: "smile",
  smug: "smug",
  stare: "stare",
  think: "think",
  thumbsup: "thumbsup",
  tickle: "tickle",
  wave: "wave",
  wink: "wink",
};

module.exports = buildRouter(apiBase, routes, "");
