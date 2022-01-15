const { sendEmotion } = require("../../helpers/roleplayMessages");

const sra = require("../../api/somerandomapiml");
const nekosbest = require("../../api/nekosbest");

const providers = [sra.wink, nekosbest.wink];

async function wink(msg, args, locale) {
  await sendEmotion({
    msg,
    locale,
    providers,
    emote: "wink",
  });
}

module.exports = {
  name: "wink",
  execute: wink,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
