const { Collection } = require("discord.js");
const translate = require("../helpers/locale");

const mentions = [];
const cooldown = new Map();

const getSubCommand = (command, [commandName, ...args], id) => {
  if (!command.subCommands?.length)
    return {
      command,
      args: [commandName, ...args],
      id,
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
      id: id + "." + command.name,
    };
  return {
    ...getSubCommand(subCommand, args, id + "." + command.name),
  };
};

async function messageHandler(msg) {
  if (!msg.guild?.available || msg.author.bot) return;
  const {
    client: {
      config: { prefix },
      commands,
      server,
      guildBlacklist,
      userBlacklist,
    },
  } = msg;

  if (guildBlacklist.has(msg.guild.id) || userBlacklist.has(msg.author.id))
    return;

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

  let id = command.name;
  if (args.length) {
    const subCommand = getSubCommand(command, args, id);
    command = subCommand.command;
    args = subCommand.args;
    id = subCommand.id;
  }

  if (!cooldown.has(id)) {
    cooldown.set(id, new Collection());
  }

  const timestamps = cooldown.get(id);
  if (timestamps.has(msg.author.id)) {
    const timeLeft = (timestamps.get(msg.author.id) - Date.now()) / 1000;
    msg.channel.send(
      translate("cooldown", serverConfig.locale, {
        timeLeft: timeLeft.toFixed(1),
      })
    );
    return;
  }

  timestamps.set(msg.author.id, Date.now() + command.cooldown * 1e3);

  setTimeout(() => {
    timestamps.delete(msg.author.id);
  }, command.cooldown * 1e3);

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
