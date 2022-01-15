const { sendEmotion } = require("../../helpers/roleplayMessages");

const nekosbest = require("../../api/nekosbest");
const nekosfun = require("../../api/nekosfun");
const shirogg = require("../../api/shirogg");

const providers = [nekosbest.smug, nekosfun.smug, shirogg.smug];

async function smug(msg, [user], locale) {
  await sendEmotion({
    msg,
    locale,
    providers,
    emote: "smug",
  });
}

module.exports = {
  name: "smug",
  execute: smug,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
