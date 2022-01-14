const axios = require("axios").default;
const apiBase = axios.create({
  baseURL: "https://api.dbot.dev/images/",
  transformResponse: [(data) => JSON.parse(data).url],
});
const buildRouter = require("./routerBuilder");

const routes = {
  blush: "blush",
  cry: "cry",
  hug: "hug",
  kiss: "kiss",
  lick: "lick",
  nom: "nom",
  pat: "pat",
  poke: "poke",
  pout: "pout",
  punch: "punch",
  slap: "slap",
  sleep: "sleep",
  smug: "smug",
  tickle: "tickle",
};

module.exports = buildRouter(apiBase, routes);
