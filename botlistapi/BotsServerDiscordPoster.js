const BasePoster = require("./BasePoster");

class DiscordBotListPoster extends BasePoster {
  post({ guilds, shards }) {
    const headers = {
      Authorization: `SDC ${this.token}`,
    };

    const body = {
      servers: guilds,
      shards,
    };

    super.post(
      body,
      headers,
      `https://api.server-discord.com/v2/bots/${this.id}/stats`
    );
  }
}

module.exports = DiscordBotListPoster;
