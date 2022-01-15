const { sendEmotion } = require("../../helpers/roleplayMessages");

const nekosbest = require("../../api/nekosbest");

const providers = [nekosbest.shrug];

async function shrug(msg, args, locale) {
  await sendEmotion({
    msg,
    locale,
    providers,
    emote: "shrug",
  });
}

module.exports = {
  name: "shrug",
  execute: shrug,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
