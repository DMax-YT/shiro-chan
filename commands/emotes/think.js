const { sendEmotion } = require("../../helpers/roleplayMessages");

const nekosbest = require("../../api/nekosbest");

const providers = [nekosbest.think];

async function think(msg, args, locale) {
  await sendEmotion({
    msg,
    locale,
    providers,
    emote: "think",
  });
}

module.exports = {
  name: "think",
  execute: think,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
