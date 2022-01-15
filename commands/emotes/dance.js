const { sendEmotion } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const nekosbest = require("../../api/nekosbest");

const providers = [purrbotsite.dance, nekosbest.dance];

async function dance(msg, args, locale) {
  await sendEmotion({
    msg,
    locale,
    providers,
    emote: "dance",
  });
}

module.exports = {
  name: "dance",
  execute: dance,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
