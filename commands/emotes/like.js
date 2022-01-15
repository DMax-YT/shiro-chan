const { sendEmotion } = require("../../helpers/roleplayMessages");

const nekosbest = require("../../api/nekosbest");

const providers = [nekosbest.thumbsup];

async function like(msg, args, locale) {
  await sendEmotion({
    msg,
    locale,
    providers,
    emote: "like",
  });
}

module.exports = {
  name: "like",
  execute: like,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
