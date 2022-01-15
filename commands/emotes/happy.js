const { sendEmotion } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const nekosbest = require("../../api/nekosbest");

const providers = [purrbotsite.smile, nekosbest.happy];

async function happy(msg, args, locale) {
  await sendEmotion({
    msg,
    locale,
    providers,
    emote: "happy",
  });
}

module.exports = {
  name: "happy",
  execute: happy,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
