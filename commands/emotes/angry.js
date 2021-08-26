const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

async function angry(msg, args, locale) {
  let imageUrl;
  try {
    imageUrl = await angryNekoChxdn();
  } catch {
    angry(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    angry(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embeds: [
      {
        description: translate("angry.action", locale, { caller: msg.member }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    ],
  });
}

async function angryNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/angry/img")
    .then((req) => req.data.url);
}

/*
module.exports = {
  name: "angry",
  execute: angry,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
*/
