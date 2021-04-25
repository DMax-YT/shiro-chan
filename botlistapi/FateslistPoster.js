const BasePoster = require("./BasePoster");

class FateslistPoster extends BasePoster {
  post({ guilds, users, shards, shard }) {
    const headers = {
      Authorization: this.token,
    };

    const body = {
      guild_count: guilds,
      shard_count: shards,
      user_count: users,
    };

    super.post(
      body,
      headers,
      `https://fateslist.xyz/api/v2/bots/${this.id}/stats`
    );
  }
}

module.exports = FateslistPoster;
