const { sendEmotion } = require("../../helpers/roleplayMessages");

const shirogg = require("../../api/shirogg");
const nekosbest = require("../../api/nekosbest");

const providers = [shirogg.pout, nekosbest.pout];

async function pout(msg, args, locale) {
  await sendEmotion({
    msg,
    locale,
    providers,
    emote: "pout",
  });
}

module.exports = {
  name: "pout",
  execute: pout,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
