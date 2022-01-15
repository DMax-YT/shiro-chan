const { sendEmotion } = require("../../helpers/roleplayMessages");

const nekosbest = require("../../api/nekosbest");
const nekosfun = require("../../api/nekosfun");

const providers = [nekosbest.laugh, nekosfun.laugh];

async function laugh(msg, args, locale) {
  await sendEmotion({
    msg,
    locale,
    providers,
    emote: "laugh",
  });
}

module.exports = {
  name: "laugh",
  execute: laugh,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
