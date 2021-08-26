/**
 * @param {import("axios").AxiosInstance} apiBase
 * @param {Object<string, string>} routes
 * @param {string} suffix
 */
const buildRouter = (apiBase, routes, suffix = "/") =>
  new Proxy(routes, {
    get: (routes, property) =>
      routes.hasOwnProperty(property)
        ? new Proxy(apiBase.get.bind(apiBase, `${routes[property]}${suffix}`), {
            apply: (request) => request().then((res) => res.data),
          })
        : () => new Promise((_, reject) => reject("No such route")),
  });

module.exports = buildRouter;
