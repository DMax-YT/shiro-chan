const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function pout(msg, args, locale) {
  let imageUrl;
  try {
    imageUrl = await poutNekoChxdn();
  } catch {
    pout(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    pout(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("pout.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function poutNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/pout/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "pout",
  execute: pout,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
