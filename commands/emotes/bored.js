const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function bored(msg, args, locale) {
  let imageUrl;
  try {
    imageUrl = await boredNekoChxdn();
  } catch {
    bored(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    bored(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("bored.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function boredNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/bored/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "bored",
  execute: bored,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
