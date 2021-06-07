async function guildChange(guild) {
  const members = guild.memberCount;
  const bots = await guild.members
    .fetch({ cache: false })
    .then((ms) => ms.filter((m) => m.user.bot));

  if (guild.memberCount === 2 || bots === members - 1) {
    await guild.channels.cache
      .find(
        (channel) =>
          channel.isText() &&
          channel.permissionsFor(guild.me).has("SEND_MESSAGES")
      )
      ?.send(
        "Hello, if you want to test me, join my support server! https://discord.gg/Hr6Z9nNE2d"
      );
    guild.leave();
  }
}

function load(client) {
  client.on("guildCreate", guildChange);
}

function unload(client) {
  client.off("guildCreate", guildChange);
}

module.exports = {
  name: "guildChecker",
  load,
  unload,
};
