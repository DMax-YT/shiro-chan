const sleep = require("../../helpers/sleep");
const { randomFloat } = require("../../helpers/random");
const { invalidUsage } = require("../../helpers/result");
const translate = require("../../helpers/locale");

const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function tryCommand(msg, args, locale) {
  if (!args.length) {
    invalidUsage(msg.channel, this.name, locale);
    return;
  }

  const action = args.join(" ");
  const embedDescription = translate("try.action", locale, {
    caller: msg.member,
    action,
  });

  const tryMessage = await msg.channel.send({
    embed: {
      description: embedDescription,
      color: resolveColor(embedInvis),
    },
  });
  await sleep(randomFloat(0.5, 1.5) * 1000);

  const success = randomFloat(0, 100) >= 50 ? true : false;
  await tryMessage.edit({
    embed: {
      description: `${embedDescription} \\| ${
        success
          ? translate("try.success", locale)
          : translate("try.failure", locale)
      }`,
      color: resolveColor(embedInvis),
    },
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
