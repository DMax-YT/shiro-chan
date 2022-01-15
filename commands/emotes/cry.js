const { sendEmotion } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const shirogg = require("../../api/shirogg");
const nekosbest = require("../../api/nekosbest");

const providers = [shirogg.cry, purrbotsite.cry, nekosbest.cry];

async function cry(msg, args, locale) {
  await sendEmotion({
    msg,
    locale,
    providers,
    emote: "cry",
  });
}

module.exports = {
  name: "cry",
  execute: cry,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
