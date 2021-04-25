const { default: axios } = require("axios");

class BasePoster {
  constructor(options) {
    this.token = options.token;
    this.id = options.id;
    this.availableQueries = Infinity;

    if (options.ratelimit && options.availableQueries) {
      this.availableQueries = options.availableQueries;
      setInterval(
        () => (this.availableQueries = options.availableQueries),
        options.ratelimit
      );
    }
  }

  async post(body, headers, url) {
    if (!this.availableQueries > 0) return;

    try {
      await axios.post(url, body, { headers });
      this.availableQueries -= 1;
    } catch (e) {
      console.error(`Failed to post to "${url}"`);
    }
  }
}

module.exports = BasePoster;
