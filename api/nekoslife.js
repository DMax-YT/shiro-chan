const axios = require("axios").default;
const apiBase = axios.create({
  baseURL: "https://nekos.life/api/v2/img/",
  transformResponse: [(data) => JSON.parse(data).url],
});
const buildRouter = require("./routerBuilder");

const routes = {
  cuddle: "cuddle",
  feed: "feed",
  hug: "hug",
  kiss: "kiss",
  pat: "pat",
  poke: "poke",
  tickle: "tickle",
  slap: "slap",
  smug: "smug",

  anal: "anal",
  bj: "bj",
  blowjob: "blowjob",
  classic: "classic",
  cum: "cum",
  kuni: "kuni",
  spank: "spank",
};

module.exports = buildRouter(apiBase, routes);
