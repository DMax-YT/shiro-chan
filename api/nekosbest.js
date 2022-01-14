const axios = require("axios").default;
const apiBase = axios.create({
  baseURL: "https://nekos.best/api/v1/",
  transformResponse: [(data) => JSON.parse(data).url],
});
const buildRouter = require("./routerBuilder");

const routes = {
  cry: "cry",
  cuddle: "cuddle",
  dance: "dance",
  feed: "feed",
  hug: "hug",
  kiss: "kiss",
  laugh: "laugh",
  pat: "pat",
  poke: "poke",
  slap: "slap",
  smile: "smile",
  tickle: "tickle",
};

module.exports = buildRouter(apiBase, routes, "");
