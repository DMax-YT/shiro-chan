async function messageHandler(msg) {
  if (!msg.guild?.available || msg.author.bot) return;
  const {
    client: {
      config: { prefix },
      commands,
      server,
    },
  } = msg;

  const serverConfig = server.ensure(msg.guild.id, {
    locale: "en-US",
    prefix,
  })

  if (!msg.content.startsWith(serverConfig.prefix) || msg.webhookID) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command =
    commands.get(cmd) ||
    commands.find((command) => command.alias && command.alias.includes(cmd));

  if (!command) return;

  try {
    const executed = command.execute(msg, args, locale);
    if (executed instanceof Promise) await executed;
  } catch (e) {
    console.error(e);
    msg.channel.send("Something went wrong");
  }
}

function load(client) {
  client.on("message", messageHandler);
}

function unload(client) {
  client.off("message", messageHandler);
}

module.exports = {
  name: "commandsHandler",
  load,
  unload,
};
