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
const BotsForDiscordPoster = require("./botlistapi/BotsForDiscordPoster");
const BoticordPoster = require("./botlistapi/BoticordPoster");
const tokens = require("./tokens.json");

const posters = [];
const initPosters = (clientId) => {
  if (!posters.length) {
    posters.push(
      new DBLPoster({
        id: clientId,
        token: tokens.discordbotlist,
      })
      /*
      new BotsServerDiscordPoster({
        id: clientId,
        token: tokens.botsServerDiscord,
        availableQueries: 1,
        ratelimit: 2000,
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
      new BotsForDiscordPoster({
        id: clientId,
        token: tokens.botsfordiscord,
      }),
      new BoticordPoster({
        id: clientId,
        token: tokens.boticord,
      })
      */
    );
  }
};
//#endregion Stats posters

const postStats = async (clientId, shardId) => {
  if (beta || !ready) return;

  const guilds = await manager
    .fetchClientValues("guilds.cache.size")
    .then((vals) => vals.reduce((acc, guilds) => acc + guilds, 0));
  const users = await manager
    .broadcastEval(
      "this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)"
    )
    .then((results) => results?.reduce((prev, val) => prev + val, 0));

  const shards = manager.shards.size;

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
  shard.on("message", async (message) => {
    if (message.type === "guildsUpdate") {
      await postStats(message.data.clientId, shard.id);
    } else if (message.type === "updateLocales") {
      await manager.broadcastEval("this.updateLocales()");
    }
  });
});

manager.spawn("auto", 1000).then(async (shards) => {
  ready = true;
  console.log(`\nSpawned ${shards.size} shards`);
});
