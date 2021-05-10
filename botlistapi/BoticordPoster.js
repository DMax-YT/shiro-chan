const BasePoster = require("./BasePoster");

class BoticordPoster extends BasePoster {
  post({ guilds, users, shards }) {
    const headers = {
      Authorization: this.token,
    };

    const body = {
      servers: guilds,
      shards,
      users,
    };

    super.post(body, headers, "https://boticord.top/api/stats");
  }
}

module.exports = BoticordPoster;
