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
      config: { prefix, owners },
      ownerCommands,
    },
  } = msg;

  if (!owners.includes(msg.author.id)) return;
  if (!msg.content.startsWith(prefix) || msg.webhookID) return;

  let args = msg.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  let command =
    ownerCommands.get(cmd) ||
    ownerCommands.find((command) => command.alias?.includes(cmd));

  if (!command) return;

  if (args.length) {
    const subCommand = getSubCommand(command, args);
    command = subCommand.command;
    args = subCommand.args;
  }

  try {
    const executed = command.execute(msg, args);
    if (executed instanceof Promise) await executed;
  } catch (e) {
    console.error(e);
    msg.channel.send("Something went wrong");
  }
}

function load(client) {
  client.on("messageCreate", messageHandler);
}

function unload(client) {
  client.off("messageCreate", messageHandler);
}

module.exports = {
  name: "commandsHandler",
  load,
  unload,
};
