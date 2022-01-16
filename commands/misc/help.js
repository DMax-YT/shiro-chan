const { MessageEmbed } = require("discord.js");
const { error } = require("../../helpers/result");
const translate = require("../../helpers/locale");

const { botOfficial } = require("../../colors.json");

async function help(msg, args, locale) {
  const prefix = msg.client.server.get(msg.guild.id, "prefix");
  let helpEmbed = new MessageEmbed({
    title: translate("help.title", locale),
    color: botOfficial,
  });

  if (args.length) {
    const name = args.join(" ").toLowerCase();

    const command =
      msg.client.commands.get(name) ||
      msg.client.commands.find((cmd) => cmd.alias.includes(name));

    if (!command || command.isPrivate) {
      await error(
        msg.channel,
        translate("help.command.notExist", locale, {
          command: name,
        }),
        locale
      );
      return;
    }

    if (!msg.channel.nsfw && command.nsfw) {
      await error(
        msg.channel,
        translate("help.command.nsfwError", locale),
        locale
      );
      return;
    }

    helpEmbed
      .addField(
        translate("help.command.description", locale),
        translate(`${command.name}.description`, locale)
      )
      .addField(
        translate("help.command.usage", locale),
        translate(`${command.name}.usage`, locale)
          .map((usage) => prefix + name + " " + usage)
          .join("\n"),
        true
      )
      .addField(
        translate("help.command.alias", locale),
        command.alias.length
          ? command.alias.map((alias) => `\`${alias}\``).join(" ")
          : translate("help.command.noAlias", locale),
        true
      )
      .addField(
        translate("help.command.examples", locale),
        translate(`${command.name}.examples`, locale)
          .map((example) => prefix + name + " " + example)
          .join("\n")
      )
      .setFooter({
        text: translate("help.argsInfo", locale),
      });
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

    helpEmbed
      .addFields(fields.sort((a, b) => a.name.localeCompare(b.name)))
      .setFooter({
        text: translate("help.moreInfo", locale, {
          prefix,
        }),
      });
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
