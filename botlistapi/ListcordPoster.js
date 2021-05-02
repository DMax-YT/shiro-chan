const BasePoster = require("./BasePoster");

class ListcordPoster extends BasePoster {
  post({ guilds, users, shards, shard }) {
    const headers = {
      Authorization: this.token,
    };

    const body = {
      server_count: guilds,
    };

    super.post(body, headers, `https://listcord.gg/api/bot/${this.id}/stats`);
  }
}

module.exports = ListcordPoster;
