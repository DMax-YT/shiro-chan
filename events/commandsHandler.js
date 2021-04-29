const mentions = [];

const getSubCommand = (command, [commandName, ...args]) => {
  if (!command.subCommands?.length)
    return {
      command,
      args: [commandName, ...args],
    };
  const commandNamelowerCase = commandName.toLowerCase();
  const subCommand = command.subCommands.find(
    (command) =>
      command.name === commandNamelowerCase ||
      command.alias?.includes(commandNamelowerCase)
  );
  if (!subCommand)
    return {
      command,
      args: [commandName, ...args],
    };
  return {
    ...getSubCommand(subCommand, args),
  };
};

async function messageHandler(msg) {
  if (!msg.guild?.available || msg.author.bot) return;
  const {
    client: {
      config: { prefix },
      commands,
      server,
    },
  } = msg;

  if (!mentions.length) {
    mentions.push(`<@${msg.guild.me.id}> `, `<@!${msg.guild.me.id}> `);
  }
  const serverConfig = server.ensure(msg.guild.id, {
    locale: "en-US",
    prefix,
  });

  const currentPrefix = mentions.reduce(
    (a, v) => (msg.content.startsWith(v) ? v : a),
    serverConfig.prefix
  );
  if (!msg.content.startsWith(currentPrefix) || msg.webhookID) return;

  let args = msg.content.slice(currentPrefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  let command =
    commands.get(cmd) ||
    commands.find((command) => command.alias?.includes(cmd));

  if (!command) return;

  if (args.length) {
    const subCommand = getSubCommand(command, args);
    command = subCommand.command;
    args = subCommand.args;
  }

  try {
    const executed = command.execute(msg, args, serverConfig.locale);
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
