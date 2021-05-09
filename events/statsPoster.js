async function guildChange(guild) {
  guild.client.shard.send({
    type: "guildsUpdate",
    data: {
      clientId: guild.me.id,
    },
  });
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
