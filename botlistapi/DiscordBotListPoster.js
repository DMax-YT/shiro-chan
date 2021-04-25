const BasePoster = require("./BasePoster");

class DiscordBotListPoster extends BasePoster {
  post({ guilds, users, shards, shard }) {
    const headers = {
      Authorization: this.token,
    };

    const body = {
      guilds,
      users,
    };

    super.post(
      body,
      headers,
      `https://discordbotlist.com/api/v1/bots/${this.id}/stats`
    );
  }
}

module.exports = DiscordBotListPoster;
