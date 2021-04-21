const sleep = require("../../helpers/sleep");
const { randomFloat } = require("../../helpers/random");
const { invalidUsage } = require("../../helpers/result");

const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function tryCommand(msg, args) {
  if (!args.length) {
    invalidUsage(msg.channel, this.name, this.usage);
    return;
  }

  const action = args.join(" ");
  const tryMessage = await msg.channel.send({
    embed: {
      description: `*${msg.member} пытается ${action}*`,
      color: resolveColor(embedInvis),
    },
  });
  await sleep(randomFloat(0.5, 1.5) * 1000);

  const success = randomFloat(0, 100) >= 50 ? true : false;
  await tryMessage.edit({
    embed: {
      description: `*${msg.member} пытается ${action}*\n${
        success ? "Успешно" : "Неудачно"
      }`,
      color: resolveColor(embedInvis),
    },
  });
}

module.exports = {
  name: "try",
  description: "Позволяет вам попробавать выполнить действие",
  execute: tryCommand,
  alias: [],
  usage: ["[действие]"],
  examples: ["взять монетку с пола"],
  argsRequired: 1,
  module: "Fun",
  isPrivate: false,
  nsfw: false,
};
