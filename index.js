const { ShardingManager } = require("discord.js");
const { token, beta } = require("./config.json");
const manager = new ShardingManager("./bot.js", {
  token,
});

let ready = false;

//#region Stats posters
const DBLPoster = require("./botlistapi/DiscordBotListPoster");
const FateslistPoster = require("./botlistapi/FateslistPoster");
const ListcordPoster = require("./botlistapi/ListcordPoster");
const BotsServerDiscordPoster = require("./botlistapi/BotsServerDiscordPoster");
const tokens = require("./tokens.json");

const posters = [];
const initPosters = (clientId) => {
  if (!posters.length) {
    posters.push(
      new DBLPoster({
        id: clientId,
        token: tokens.discordbotlist,
      }),
      new FateslistPoster({
        id: clientId,
        token: tokens.fateslist,
      }),
      new ListcordPoster({
        id: clientId,
        token: tokens.listcord,
        availableQueries: 1,
        ratelimit: 120000,
      }),
      new BotsServerDiscordPoster({
        id: clientId,
        token: tokens.botsServerDiscord,
        availableQueries: 1,
        ratelimit: 2000,
      })
    );
  }
};
//#endregion Stats posters

const postStats = async (clientId, shardId) => {
  const guilds = await manager
    .fetchClientValues("guilds.cache.size")
    .then((vals) => vals.reduce((acc, guilds) => acc + guilds, 0));
  const users = await manager
    .broadcastEval(
      "this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)"
    )
    .then((results) => results?.reduce((prev, val) => prev + val, 0));

  const shards = manager.shards.size;

  if (beta || !ready) return;
  if (!posters.length) initPosters(clientId);

  posters.map((poster) =>
    poster.post({
      guilds,
      users,
      shards,
      shard: shardId,
    })
  );
};

manager.on("shardCreate", (shard) => {
  console.log(`Spawning shard #${shard.id}`);
  shard.on("message", (message) => {
    if (message.type === "guildsUpdate") {
      postStats(message.data.clientId, shard.id);
    }
  });
});

manager.spawn("auto", 1000).then(async (shards) => {
  console.log(`\nSpawned ${shards.size} shards`);
  ready = true;
});
