/**
 * @template T
 * @param {import("axios").AxiosInstance} apiBase
 * @param {T} routes
 * @param {string} suffix
 * @returns {{[K in keyof T]: () => Promise<string>}}
 */
const buildRouter = (apiBase, routes, suffix = "/") => {
  const newRoutes = {};
  for (const key in routes) {
    newRoutes[key] = () =>
      apiBase.get(apiBase, `${routes[key]}${suffix}`).then((res) => res.data);
  }

  return newRoutes;
};

module.exports = buildRouter;
