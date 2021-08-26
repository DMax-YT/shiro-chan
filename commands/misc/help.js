const { error } = require("../../helpers/result");
const translate = require("../../helpers/locale");

const {
  Util: { resolveColor },
} = require("discord.js");
const { botOfficial } = require("../../colors.json");

async function help(msg, args, locale) {
  const prefix = msg.client.server.get(msg.guild.id, "prefix");
  let helpEmbed = {
    title: translate("help.title", locale),
    color: resolveColor(botOfficial),
  };

  if (args.length) {
    const name = args.join(" ").toLowerCase();

    const command =
      msg.client.commands.get(name) ||
      msg.client.commands.find((cmd) => cmd.alias.includes(name));

    if (!command || command.isPrivate) {
      error(
        msg.channel,
        translate("help.command.notExist", locale, {
          command: name,
        }),
        locale
      );
      return;
    }

    if (!msg.channel.nsfw && command.nsfw) {
      error(msg.channel, translate("help.command.nsfwError", locale), locale);
      return;
    }

    helpEmbed = {
      ...helpEmbed,
      fields: [
        {
          name: translate("help.command.description", locale),
          value: translate(`${command.name}.description`, locale),
        },
        {
          name: translate("help.command.usage", locale),
          value: translate(`${command.name}.usage`, locale)
            .map((usage) => prefix + name + " " + usage)
            .join("\n"),
          inline: true,
        },
        {
          name: translate("help.command.alias", locale),
          value: command.alias.length
            ? command.alias.map((alias) => `\`${alias}\``).join(" ")
            : translate("help.command.noAlias", locale),
          inline: true,
        },
        {
          name: translate("help.command.examples", locale),
          value: translate(`${command.name}.examples`, locale)
            .map((example) => prefix + name + " " + example)
            .join("\n"),
        },
      ],
      footer: {
        text: translate("help.argsInfo", locale),
      },
    };
  } else {
    const fields = [];
    const modules = new Set(msg.client.commands.map((c) => c.module));

    for (const module of modules) {
      const commands = msg.client.commands
        .filter((cmd) => cmd.module === module && !cmd.isPrivate)
        .map((command) =>
          command.nsfw
            ? `||\`${prefix}${command.name}\`||`
            : `\`${prefix}${command.name}\``
        )
        .join(" ");

      if (commands) {
        fields.push({
          name: module,
          value: commands,
        });
      }
    }

    helpEmbed = {
      ...helpEmbed,
      fields: fields.sort((a, b) => a.name.localeCompare(b.name)),
      footer: {
        text: translate("help.moreInfo", locale, {
          prefix,
        }),
      },
    };
  }

  await msg.channel.send({
    embeds: [helpEmbed],
  });
}

module.exports = {
  name: "help",
  execute: help,
  alias: ["h"],
  cooldown: 0,
  argsRequired: 0,
  module: "Misc",
  isPrivate: false,
};
