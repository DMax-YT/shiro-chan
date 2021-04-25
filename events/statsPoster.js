const DBLPoster = require("../botlistapi/DiscordBotListPoster");
const FateslistPoster = require("../botlistapi/FateslistPoster");

const posters = [];
const setPosters = (id) => {
  if (!posters.length) {
    posters.push(
      new DBLPoster({
        id,
        token: "",
      }),
      new FateslistPoster({
        id,
        token: "",
      })
    );
  }
};

async function guildChange(guild) {
  if (!posters.length) {
    setPosters(guild.client.user.id);
  }

  const guilds = guild.client.guilds.cache.size;
  const users = guild.client.guilds.cache.reduce(
    (a, v) => a + v.memberCount,
    0
  );
  const shards = guild.client.shard?.count || 1;
  const shard = guild.shardID;

  posters.map((poster) =>
    poster.post({
      guilds,
      users,
      shards,
      shard,
    })
  );
}

function load(client) {
  client.on("guildCreate", guildChange);
  client.on("guildDelete", guildChange);
}

function unload(client) {
  client.off("guildCreate", guildChange);
  client.off("guildDelete", guildChange);
}

module.exports = {
  name: "statsPoster",
  load,
  unload,
};
