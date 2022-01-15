const { sendEmotion } = require("../../helpers/roleplayMessages");

const nekosbest = require("../../api/nekosbest");

const providers = [nekosbest.bored];

async function bored(msg, args, locale) {
  await sendEmotion({
    msg,
    locale,
    providers,
    emote: "bored",
  });
}

module.exports = {
  name: "bored",
  execute: bored,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
