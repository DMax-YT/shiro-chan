const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function nervous(msg, args, locale) {
  let imageUrl;
  try {
    imageUrl = await nervousNekoChxdn();
  } catch {
    nervous(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    nervous(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("nervous.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function nervousNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/nervous/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "nervous",
  execute: nervous,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
