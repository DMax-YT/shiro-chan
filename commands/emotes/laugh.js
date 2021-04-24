const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function laugh(msg, args, locale) {
  let imageUrl;
  try {
    imageUrl = await laughNekoChxdn();
  } catch {
    laugh(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    laugh(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("laugh.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function laughNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/laugh/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "laugh",
  execute: laugh,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
