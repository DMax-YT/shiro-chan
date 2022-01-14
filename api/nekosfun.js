const axios = require("axios").default;
const apiBase = axios.create({
  baseURL: "http://api.nekos.fun:8080/api/",
  transformResponse: [
    (data) => {
      const url = JSON.parse(data).image;
      return url.endsWith(".gif") ? url : "";
    },
  ],
});
const buildRouter = require("./routerBuilder");

const routes = {
  cry: "cry",
  cuddle: "cuddle",
  feed: "feed",
  hug: "hug",
  kiss: "kiss",
  laugh: "laugh",
  lick: "lick",
  pat: "pat",
  poke: "poke",
  slap: "slap",
  smug: "smug",
  tickle: "tickle",

  anal: "anal",
  cum: "cum",
  bj: "bj",
  blowjob: "blowjob",
  spank: "spank",
};

module.exports = buildRouter(apiBase, routes);
