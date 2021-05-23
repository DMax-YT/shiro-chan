const util = require("util");
const { Client, Collection } = require("discord.js");
const Enmap = require("enmap");
const recursiveRead = require("./helpers/recursiveReader");

const client = new Client();
client.events = new Collection();
client.commands = new Collection();

client.server = new Enmap({
  name: "serverSettings",
  dataDir: "./db",
});
client.config = require("./config.json");
const { owners, prefix, token } = client.config;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity({
    name: `@${client.user.username}`,
    type: "LISTENING",
  });
});

//#region eval
const clean = (text) =>
  typeof text === "string"
    ? text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
    : text;

client.on("message", async (msg) => {
  if (!owners.includes(msg.author.id)) return;

  const [cmd_name, ...args] = msg.content.slice(prefix.length).split(/ +/);
  if (cmd_name.toLowerCase() !== "eval") return;

  const code = args.join(" ").replace(/```(js)?/gim, "");

  if (!code) return;
  try {
    const start = Date.now();
    let evaled = eval(code);
    if (evaled instanceof Promise) evaled = await evaled;
    if (typeof evaled !== "string") evaled = util.inspect(evaled, { depth: 0 });
    if (evaled.includes(client.token)) return;
    const file_res =
      evaled.length > 2048 - 9 ? Buffer.from(evaled, "utf-8") : undefined;

    msg.channel.send({
      files: file_res
        ? [
            {
              name: "result.txt",
              attachment: file_res,
            },
          ]
        : [],
      embed: {
        title: "✅ Successfully evaluated",
        description: file_res ? "" : `\`\`\`xl\n${clean(evaled)}\`\`\``,
        footer: {
          text: `Took ${Date.now() - start} ms to eval`,
        },
        color: 0x00ff00,
      },
    });
  } catch (e) {
    msg.channel.send({
      embed: {
        title: "❌ Something went wrong",
        description: `\`\`\`xl\n${clean(e.message)}\`\`\``,
        color: 0xff0000,
      },
    });
  }
});
//#endregion

const requestLocales = () => {
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
  console.log(await client.registerEvents());
  client.login(token);
})();
