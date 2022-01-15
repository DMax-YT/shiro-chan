const { sendEmotion } = require("../../helpers/roleplayMessages");

const shirogg = require("../../api/shirogg");
const nekosbest = require("../../api/nekosbest");

const providers = [shirogg.sleep, nekosbest.sleep];

async function sleep(msg, args, locale) {
  await sendEmotion({
    msg,
    locale,
    providers,
    emote: "sleep",
  });
}

module.exports = {
  name: "sleep",
  execute: sleep,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
