const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function cry(msg, args, locale) {
  let imageUrl;
  try {
    imageUrl = await cryNekoChxdn();
  } catch {
    cry(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    cry(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("cry.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function cryNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/cry/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "cry",
  execute: cry,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
