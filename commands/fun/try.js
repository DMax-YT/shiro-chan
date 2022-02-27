const { MessageEmbed } = require("discord.js");
const { invalidUsage } = require("../../helpers/templateMessages");

const sleep = require("../../helpers/sleep");
const translate = require("../../helpers/locale");
const { random, randomFloat } = require("../../helpers/random");

const { embedInvisible } = require("../../colors.json");

async function tryCommand(msg, args, locale) {
  if (!args.length) {
    await invalidUsage(msg.channel, this.name, locale);
    return;
  }

  const action = args.join(" ");
  const tryEmbed = new MessageEmbed({
    description: translate("try.action", locale, {
      caller: msg.member,
      action,
    }),
    color: embedInvisible,
  });

  const tryMessage = await msg.reply({
    embeds: [tryEmbed],
    allowedMentions: {
      repliedUser: false,
    },
  });

  await sleep(randomFloat(0.5, 1.5) * 1000);
  const success = random(0, 100) >= 50 ? true : false;

  if (success) {
    tryEmbed
      .setAuthor({
        name: translate("try.success", locale),
      })
      .setColor("DARK_GREEN");
  } else {
    tryEmbed
      .setAuthor({
        name: translate("try.failure", locale),
      })
      .setColor("DARK_RED");
  }

  await tryMessage.edit({
    embeds: [tryEmbed],
  });
}

module.exports = {
  name: "try",
  execute: tryCommand,
  alias: [],
  cooldown: 2,
  argsRequired: 1,
  module: "Fun",
  isPrivate: false,
  nsfw: false,
};
