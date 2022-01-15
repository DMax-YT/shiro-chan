const { sendEmotion } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const shirogg = require("../../api/shirogg");
const nekosbest = require("../../api/nekosbest");

const providers = [shirogg.blush, purrbotsite.blush, nekosbest.blush];

async function blush(msg, args, locale) {
  await sendEmotion({
    msg,
    locale,
    providers,
    emote: "blush",
  });
}

module.exports = {
  name: "blush",
  execute: blush,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
