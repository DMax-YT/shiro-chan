const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function smirk(msg, args, locale) {
  let imageUrl;
  try {
    imageUrl = await smirkNekoChxdn();
  } catch {
    smirk(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    smirk(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("smirk.action", locale, { caller: msg.member }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function smirkNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/smirk/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "smirk",
  execute: smirk,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
