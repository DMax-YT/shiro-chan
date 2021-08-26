const { Client, Collection } = require("discord.js");
const Enmap = require("enmap");
const recursiveRead = require("./helpers/recursiveReader");

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});
client.events = new Collection();
client.commands = new Collection();
client.ownerCommands = new Collection();

client.server = new Enmap({
  name: "serverSettings",
  dataDir: "./db",
});
client.guildBlacklist = new Enmap({
  name: "guildBlacklist",
  dataDir: "./db",
});
client.userBlacklist = new Enmap({
  name: "guildBlacklist",
  dataDir: "./db",
});
client.config = require("./config.json");
const { token } = client.config;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity({
    name: `@${client.user.username}`,
    type: "LISTENING",
  });
});

client.requestLocales = () => {
  client.shard.send({ type: "updateLocales" });
};

client.updateLocales = async () => {
  const locales = await recursiveRead("./locales").then((files) =>
    files.filter((file) => file.endsWith(".json"))
  );

  for (const file of locales) {
    delete require.cache[require.resolve(file)];
    require(file);
  }
};

client.registerCommands = async () => {
  let error = "";
  try {
    const commands = await recursiveRead("./commands");
    for (const file of commands) {
      try {
        delete require.cache[require.resolve(file)];
        const module = require(file);
        if (!module.name) {
          continue;
        }

        if (Array.isArray(module)) {
          for (const command of module) {
            client.commands.set(command.name, command);
          }
        } else {
          client.commands.set(module.name, module);
        }
      } catch (e) {
        error += `Error in ${file}\n${e.stack}\n\n`;
      }
    }

    return error || "Successfully registered all commands";
  } catch (err) {
    return (
      err.stack ||
      "Something went wrong, please check commands for forbidden code"
    );
  }
};

client.registerOwnerCommands = async () => {
  let error = "";
  try {
    const commands = await recursiveRead("./ownerCommands");
    for (const file of commands) {
      try {
        delete require.cache[require.resolve(file)];
        const module = require(file);
        if (!module.name) {
          continue;
        }

        if (Array.isArray(module)) {
          for (const command of module) {
            client.ownerCommands.set(command.name, command);
          }
        } else {
          client.ownerCommands.set(module.name, module);
        }
      } catch (e) {
        error += `Error in ${file}\n${e.stack}\n\n`;
      }
    }

    return error || "Successfully registered all owner commands";
  } catch (err) {
    return (
      err.stack ||
      "Something went wrong, please check commands for forbidden code"
    );
  }
};

client.registerEvents = async () => {
  let error = "";
  try {
    const files = await recursiveRead("./events");

    for (const [, event] of client.events) {
      event.unload(client);
    }
    client.events.clear();

    for (const event of files) {
      delete require.cache[require.resolve(event)];
      try {
        const module = require(event);

        client.events.set(module.name, module);
        module.load(client);
      } catch (e) {
        error += `Error in ${event}\n${e.stack}\n\n`;
      }
    }
    return error || "Successfully registered all events";
  } catch (err) {
    return (
      err.stack ||
      "Something went wrong, please check events for forbidden code"
    );
  }
};

(async () => {
  console.log(await client.registerCommands());
  console.log(await client.registerOwnerCommands());
  console.log(await client.registerEvents());
  client.login(token);
})();
