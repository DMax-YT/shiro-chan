const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function blush(msg, args, locale) {
  let imageUrl;
  try {
    imageUrl = await blushNekoChxdn();
  } catch {
    blush(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    blush(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("blush.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function blushNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/blush/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "blush",
  execute: blush,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
