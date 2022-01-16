const { random } = require("../../helpers/random");
const { invalidUsage } = require("../../helpers/result");
const translate = require("../../helpers/locale");

async function randomExecute(msg, args, locale) {
  const min = parseInt(args[0]);
  const max = parseInt(args[1]);
  if (isNaN(min) || isNaN(max)) {
    await invalidUsage(msg.channel, this.name, locale);
    return;
  }

  await msg.reply({
    content: translate("random.result", locale, {
      number: random(min, max),
    }),
    allowedMentions: {
      repliedUser: false,
    },
  });
}

module.exports = {
  name: "random",
  execute: randomExecute,
  alias: [],
  cooldown: 1,
  argsRequired: 0,
  module: "Fun",
  isPrivate: false,
  subCommands: [],
};
