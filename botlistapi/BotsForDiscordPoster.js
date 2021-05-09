const BasePoster = require("./BasePoster");

class BotsForDiscordPoster extends BasePoster {
  post({ guilds }) {
    const headers = {
      Authorization: this.token,
    };

    const body = {
      server_count: guilds,
    };

    super.post(body, headers, `https://botsfordiscord.com/api/bot/${this.id}`);
  }
}

module.exports = BotsForDiscordPoster;
