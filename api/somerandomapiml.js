const axios = require("axios").default;
const apiBase = axios.create({
  baseURL: "https://some-random-api.ml/animu/",
  transformResponse: [(data) => JSON.parse(data).link],
});
const buildRouter = require("./routerBuilder");

const routes = {
  hug: "hug",
  pat: "pat",
  wink: "wink",
};

module.exports = buildRouter(apiBase, routes);
