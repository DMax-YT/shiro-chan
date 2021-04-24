const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function happy(msg, args, locale) {
  let imageUrl;
  try {
    imageUrl = await happyNekoChxdn();
  } catch {
    happy(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    happy(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("happy.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function happyNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/happy/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "happy",
  execute: happy,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
