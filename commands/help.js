const { error } = require("../helpers/result");
const { prefix } = require("../config.json");

const baseEmbed = {
  title: "Помощь",
  color: 0x03c2fc,
};

async function help(msg, args) {
  let helpEmbed;

  if (args.length) {
    const name = args.join(" ").toLowerCase();

    const command =
      msg.client.commands.get(name) ||
      msg.client.commands.find((cmd) => cmd.alias.includes(name));

    if (!command || command.isPrivate) {
      error(msg.channel, `The command \`${name}\` doesn't exist`);
      return;
    }

    helpEmbed = {
      ...baseEmbed,
      fields: [
        {
          name: "Описание",
          value: command.description,
        },
        {
          name: "Использование",
          value: command.usage
            .map((example) => prefix + name + " " + example)
            .join("\n"),
          inline: true,
        },
        {
          name: "Псевдонимы",
          value: command.alias.length
            ? command.alias.map((alias) => `\`${alias}\``).join(" ")
            : "Нет псевдонимов",
          inline: true,
        },
        {
          name: "Примеры использования",
          value: command.examples
            .map((example) => prefix + name + " " + example)
            .join("\n"),
        },
      ],
      footer: {
        text: "📌 Аргумент: [] - обязательный, () - опциональный",
      },
    };
  } else {
    const fields = [];
    const modules = new Set(msg.client.commands.map((c) => c.module));

    for (const module of modules) {
      const commands = msg.client.commands
        .filter((cmd) => cmd.module === module && !cmd.isPrivate)
        .map((command) => `\`${prefix}${command.name}\``)
        .join(" ");

      if (commands) {
        fields.push({
          name: module,
          value: commands,
        });
      }
    }

    helpEmbed = {
      ...baseEmbed,
      fields: fields.sort((a, b) => a.name.localeCompare(b.name)),
      footer: {
        text: `📌 Больше информации: ${prefix}help (название команды)`,
      },
    };
  }

  await msg.channel.send({
    embed: helpEmbed,
  });
}

module.exports = {
  name: "help",
  description: "Показывает все команды или информацию о выбранной",
  execute: help,
  alias: ["h"],
  usage: ["(command name)"],
  examples: ["", "pet"],
  argsRequired: 0,
  module: "Misc",
  isPrivate: false,
};
